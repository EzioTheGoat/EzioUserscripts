// ==UserScript==
// @name         Bypass CimaNow — UI
// @namespace    Ezio Scripts
// @version      1.1
// @match        *://*.cimanow.cc/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  let rendered = false;
  let tries = 0;
  let iframe = null;

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
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', Arial;
      direction: rtl;
      background: transparent;
      color: #fff;
    }

    #czn-backdrop {
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at center, rgba(0,0,0,0.6), rgba(0,0,0,0.85));
      backdrop-filter: blur(14px);
    }

    #czn-panel {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.96);
      opacity: 0;
      width: 700px;
      max-width: 94vw;
      max-height: 88vh;
      overflow-y: auto;
      background: linear-gradient(145deg, #12122a, #0d0d1f);
      border-radius: 22px;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow:
        0 40px 80px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(255,255,255,0.05);
      transition: 0.25s ease;
    }

    #czn-panel.show {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .czn-header {
      padding: 22px 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .czn-title {
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    .czn-close-x {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.2s;
    }

    .czn-close-x:hover {
      background: rgba(255,80,80,0.2);
      transform: rotate(90deg);
    }

    .czn-body { padding: 10px 26px 26px; }

    .czn-group-label {
      font-size: 11px;
      letter-spacing: 1px;
      color: rgba(255,255,255,0.35);
      margin: 22px 0 10px;
    }

    .czn-btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .czn-q-btn {
      padding: 14px 20px;
      border-radius: 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      text-decoration: none;
      color: #fff;
      min-width: 100px;
      transition: 0.2s;
      position: relative;
    }

    .czn-q-btn:hover {
      transform: translateY(-3px);
      background: rgba(255,255,255,0.08);
    }

    .czn-q-btn.czn-best {
      background: linear-gradient(135deg, #1f4037, #3ecf8e);
      border: none;
      box-shadow: 0 10px 30px rgba(62,207,142,0.4);
    }

    .czn-q-res {
      font-size: 17px;
      font-weight: 700;
    }

    .czn-q-size {
      font-size: 11px;
      opacity: 0.6;
      margin-top: 4px;
    }

    .czn-hd-badge {
      font-size: 9px;
      margin-top: 5px;
      opacity: 0.8;
    }

    .czn-link-btn {
      padding: 10px 16px;
      border-radius: 12px;
      background: rgba(99,162,255,0.1);
      border: 1px solid rgba(99,162,255,0.2);
      color: #7ab8ff;
      text-decoration: none;
      transition: 0.2s;
    }

    .czn-link-btn:hover {
      background: rgba(99,162,255,0.25);
      transform: translateY(-2px);
    }

    .czn-footer {
      padding: 16px 26px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .czn-close-btn {
      padding: 8px 16px;
      border-radius: 10px;
      border: 1px solid rgba(255,100,100,0.2);
      cursor: pointer;
      transition: 0.2s;
    }

    .czn-close-btn:hover {
      background: rgba(255,100,100,0.15);
    }
  `;

  function createIframe() {
    iframe = document.createElement("iframe");

    iframe.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
      z-index: 2147483647;
      pointer-events: none;
    `;

    document.documentElement.appendChild(iframe);

    const doc = iframe.contentDocument;
    doc.open();
    doc.write(`<html><head><style>${CSS}</style></head><body></body></html>`);
    doc.close();

    return doc;
  }

  function render(grouped) {
    if (rendered) return;

    const doc = createIframe();

    const backdrop = doc.createElement("div");
    backdrop.id = "czn-backdrop";

    const panel = doc.createElement("div");
    panel.id = "czn-panel";

    const header = doc.createElement("div");
    header.className = "czn-header";
    header.innerHTML = `
      <div class="czn-title">تحميل مباشر</div>
      <div class="czn-close-x">✕</div>
    `;

    const body = doc.createElement("div");
    body.className = "czn-body";

    Object.keys(grouped).forEach(title => {
      const label = doc.createElement("div");
      label.className = "czn-group-label";
      label.textContent = title;
      body.appendChild(label);

      const row = doc.createElement("div");
      row.className = "czn-btn-row";

      grouped[title].forEach(item => {
        const btn = doc.createElement("a");

        if (item.quality) {
          const isBest = item.quality === "1080p";
          btn.className = "czn-q-btn" + (isBest ? " czn-best" : "");
          btn.innerHTML = `
            <div class="czn-q-res">${item.quality}</div>
            ${item.size ? `<div class="czn-q-size">${item.size}</div>` : ""}
            ${isBest ? `<div class="czn-hd-badge">FULL HD</div>` : ""}
          `;
        } else {
          btn.className = "czn-link-btn";
          btn.textContent = item.name;
        }

        btn.href = item.url;
        btn.target = "_blank";
        row.appendChild(btn);
      });

      body.appendChild(row);
    });

    const footer = doc.createElement("div");
    footer.className = "czn-footer";
    footer.innerHTML = `
      <div>Bypass CimaNow — Ezio</div>
      <div class="czn-close-btn">إغلاق</div>
    `;

    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(footer);

    doc.body.appendChild(backdrop);
    doc.body.appendChild(panel);

    iframe.style.pointerEvents = "auto";

    requestAnimationFrame(() => panel.classList.add("show"));

    const close = () => iframe.remove();

    header.querySelector(".czn-close-x").onclick = close;
    footer.querySelector(".czn-close-btn").onclick = close;

    rendered = true;
  }

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
