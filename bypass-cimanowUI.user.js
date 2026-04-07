// ==UserScript==
// @name         Bypass CimaNow — UI
// @namespace    Ezio Scripts
// @version      5.1
// @match        *://*.cimanow.cc/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    let rendered = false;

    function extract() {
        const data = [...document.querySelectorAll("a")]
            .map(a => {
                const text = (a.innerText || "").trim();
                const href = a.href;
                if (!href || !text) return null;
                const li = a.closest("li");
                const titleEl = li ? li.querySelector("span") : null;
                const title = titleEl ? titleEl.innerText.trim() : null;
                if (!title) return null;
                return { title, text, href };
            })
            .filter(Boolean);

        const grouped = {};

        data.forEach(item => {
            const title = item.title.replace(/\s+/g, " ").trim();
            if (!grouped[title]) grouped[title] = [];
            const parts = item.text.split("\n").map(x => x.trim()).filter(Boolean);
            const qualityMatch = item.text.match(/(360|480|720|1080)/);
            const quality = qualityMatch ? qualityMatch[0] + "p" : null;
            const size = parts.find(p => /(جيجا|ميجا|GB|MB)/i.test(p)) || "";
            if (quality) {
                grouped[title].push({ quality, size, url: item.href });
            } else {
                grouped[title].push({ name: parts[0] || item.text, url: item.href });
            }
        });

        Object.keys(grouped).forEach(key => {
            grouped[key] = Array.from(new Map(grouped[key].map(x => [x.url, x])).values());
        });

        return { grouped, count: data.length };
    }

    const CSS = `
        :host {
            all: initial;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        #czn-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.65);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 2147483646;
            pointer-events: auto;
        }
        #czn-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.92);
            opacity: 0;
            transition: opacity 0.2s ease, transform 0.2s ease;
            width: 680px;
            max-width: 92vw;
            max-height: 86vh;
            overflow-y: auto;
            overflow-x: hidden;
            background: #12122a;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px;
            z-index: 2147483647;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 14px;
            direction: rtl;
            color: #fff;
            pointer-events: auto;
        }
        #czn-panel.czn-in {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        .czn-header {
            padding: 20px 24px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            background: #12122a;
            z-index: 1;
        }
        .czn-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 600;
            color: #fff;
        }
        .czn-title svg { flex-shrink: 0; }
        .czn-close-x {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: rgba(255,255,255,0.45);
            font-size: 15px;
            line-height: 1;
            transition: background 0.15s, color 0.15s;
            flex-shrink: 0;
            user-select: none;
        }
        .czn-close-x:hover { background: rgba(255,80,80,0.2); color: #ff6b6b; }
        .czn-body { padding: 18px 24px 22px; }
        .czn-group-label {
            font-size: 11px;
            font-weight: 600;
            color: rgba(255,255,255,0.3);
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin: 20px 0 12px;
        }
        .czn-btn-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .czn-q-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px 20px;
            border-radius: 14px;
            cursor: pointer;
            border: 1px solid rgba(255,255,255,0.09);
            background: rgba(255,255,255,0.05);
            min-width: 96px;
            text-align: center;
            transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s ease;
            text-decoration: none;
            color: #fff;
        }
        .czn-q-btn:hover {
            transform: translateY(-2px);
            background: rgba(255,255,255,0.09);
            border-color: rgba(255,255,255,0.18);
        }
        .czn-q-btn.czn-best {
            background: rgba(34,84,61,0.5);
            border-color: rgba(72,199,142,0.28);
        }
        .czn-q-btn.czn-best:hover {
            background: rgba(34,84,61,0.7);
            border-color: rgba(72,199,142,0.5);
        }
        .czn-q-res { font-size: 16px; font-weight: 700; color: #fff; }
        .czn-q-size { font-size: 11px; color: rgba(255,255,255,0.38); margin-top: 3px; }
        .czn-hd-badge {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.07em;
            color: #48c78e;
            background: rgba(72,199,142,0.13);
            border: 1px solid rgba(72,199,142,0.25);
            padding: 2px 7px;
            border-radius: 5px;
            margin-top: 6px;
        }
        .czn-link-btn {
            padding: 10px 18px;
            border-radius: 12px;
            cursor: pointer;
            background: rgba(99,162,255,0.1);
            border: 1px solid rgba(99,162,255,0.18);
            font-size: 13px;
            color: #7ab8ff;
            text-decoration: none;
            transition: background 0.12s ease, border-color 0.12s ease;
            display: inline-block;
        }
        .czn-link-btn:hover {
            background: rgba(99,162,255,0.2);
            border-color: rgba(99,162,255,0.35);
        }
        .czn-divider {
            height: 1px;
            background: rgba(255,255,255,0.05);
            margin: 18px 0 0;
        }
        .czn-footer {
            padding: 13px 24px;
            border-top: 1px solid rgba(255,255,255,0.06);
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            bottom: 0;
            background: #12122a;
        }
        .czn-version { font-size: 11px; color: rgba(255,255,255,0.2); }
        .czn-close-btn {
            font-size: 13px;
            color: rgba(255,100,100,0.65);
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 9px;
            border: 1px solid rgba(255,100,100,0.18);
            background: transparent;
            transition: background 0.12s ease, color 0.12s ease;
            user-select: none;
        }
        .czn-close-btn:hover {
            background: rgba(255,100,100,0.1);
            color: #ff8080;
        }
    `;

    function render(grouped) {
        if (rendered) return;

        const host = document.createElement("div");
        host.style.cssText = "all:unset;position:fixed;inset:0;z-index:2147483647;pointer-events:none;";
        document.body.appendChild(host);

        const shadow = host.attachShadow({ mode: "closed" });

        const styleEl = document.createElement("style");
        styleEl.textContent = CSS;
        shadow.appendChild(styleEl);

        const backdrop = document.createElement("div");
        backdrop.id = "czn-backdrop";

        const panel = document.createElement("div");
        panel.id = "czn-panel";

        const header = document.createElement("div");
        header.className = "czn-header";
        header.innerHTML = `
            <div class="czn-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                     stroke="#7ab8ff" stroke-width="2.2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                تحميل مباشر
            </div>
            <div class="czn-close-x" id="czn-close-x">✕</div>
        `;

        const body = document.createElement("div");
        body.className = "czn-body";

        const titles = Object.keys(grouped);
        titles.forEach((title, i) => {
            const items = grouped[title];
            const qualityItems = items.filter(x => x.quality);
            const linkItems = items.filter(x => !x.quality);

            if (i > 0) {
                const div = document.createElement("div");
                div.className = "czn-divider";
                body.appendChild(div);
            }

            const label = document.createElement("div");
            label.className = "czn-group-label";
            label.textContent = title;
            body.appendChild(label);

            if (qualityItems.length) {
                const row = document.createElement("div");
                row.className = "czn-btn-row";
                qualityItems.sort((a, b) => parseInt(b.quality) - parseInt(a.quality));
                qualityItems.forEach(item => {
                    const isBest = item.quality === "1080p";
                    const btn = document.createElement("a");
                    btn.className = "czn-q-btn" + (isBest ? " czn-best" : "");
                    btn.href = item.url;
                    btn.target = "_blank";
                    btn.rel = "noopener noreferrer";
                    btn.innerHTML = `
                        <div class="czn-q-res">${item.quality}</div>
                        ${item.size ? `<div class="czn-q-size">${item.size}</div>` : ""}
                        ${isBest ? `<div class="czn-hd-badge">FULL HD</div>` : ""}
                    `;
                    row.appendChild(btn);
                });
                body.appendChild(row);
            }

            if (linkItems.length) {
                if (qualityItems.length) {
                    const spacer = document.createElement("div");
                    spacer.style.marginTop = "10px";
                    body.appendChild(spacer);
                }
                const row = document.createElement("div");
                row.className = "czn-btn-row";
                linkItems.forEach(item => {
                    const btn = document.createElement("a");
                    btn.className = "czn-link-btn";
                    btn.href = item.url;
                    btn.target = "_blank";
                    btn.rel = "noopener noreferrer";
                    btn.textContent = item.name;
                    row.appendChild(btn);
                });
                body.appendChild(row);
            }
        });

        const footer = document.createElement("div");
        footer.className = "czn-footer";
        footer.innerHTML = `
            <div class="czn-version">Bypass CimaNow — Ezio Auditore</div>
            <div class="czn-close-btn" id="czn-close-btn">إغلاق</div>
        `;

        panel.appendChild(header);
        panel.appendChild(body);
        panel.appendChild(footer);

        shadow.appendChild(backdrop);
        shadow.appendChild(panel);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => panel.classList.add("czn-in"));
        });

        function close() {
            panel.classList.remove("czn-in");
            setTimeout(() => host.remove(), 220);
        }

        backdrop.addEventListener("click", close);
        shadow.getElementById("czn-close-x").addEventListener("click", close);
        shadow.getElementById("czn-close-btn").addEventListener("click", close);

        rendered = true;
    }

    let tries = 0;
    const interval = setInterval(() => {
        const { grouped, count } = extract();
        tries++;
        if (count > 0 && Object.keys(grouped).length > 0) {
            clearInterval(interval);
            render(grouped);
        }
        if (tries > 15) clearInterval(interval);
    }, 600);

})();
