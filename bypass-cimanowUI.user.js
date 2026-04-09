// ==UserScript==
// @name         Bypass CimaNow — UI
// @namespace    Ezio Scripts
// @version      1.6
// @match        *://*.cimanow.cc/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const isWatchPage =
    location.pathname.includes("/watching/") &&
    location.search.includes("token=");

  if (!isWatchPage) return;

  const _setTimeout = window.setTimeout.bind(window);
  const _createObjectURL = URL.createObjectURL.bind(URL);
  const _Blob = window.Blob;
  const _log = console.log.bind(console);

  let extracted = null;

  function extractMediaInfo() {
    const path = decodeURIComponent(location.pathname);
    const info = {
      title: "",
      type: "movie",
      season: null,
      episode: null,
      trans: "",
      year: null,
    };
    const cleaned = path
      .replace(/\/watching\/?/gi, "")
      .replace(/^\/+|\/+$/g, "");

    if (/مسلسل|series/i.test(cleaned)) info.type = "series";
    else if (/فيلم|movie|film/i.test(cleaned)) info.type = "movie";
    else if (/برنامج|program/i.test(cleaned)) info.type = "show";
    else if (/انمي|anime/i.test(cleaned)) info.type = "anime";

    const sm = cleaned.match(/(?:ج|جزء|موسم|الموسم|season|s)[\s\-_]*(\d+)/i);
    if (sm) info.season = parseInt(sm[1]);
    const em = cleaned.match(/(?:ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*(\d+)/i);
    if (em) info.episode = parseInt(em[1]);

    if (info.season !== null || info.episode !== null) info.type = "series";
    if (info.type === "movie") {
      info.season = null;
      info.episode = null;
    }

    if (/مترجم/.test(cleaned)) info.trans = "مترجم";
    else if (/مدبلج/.test(cleaned)) info.trans = "مدبلج";

    const ym = cleaned.match(/\b(19|20)\d{2}\b/);
    if (ym) info.year = ym[0];

    let slug = cleaned
      .replace(/^(مسلسل|فيلم|برنامج|انمي)[\s\-_]*/i, "")
      .replace(/[\s\-_]*(ج|جزء|موسم|الموسم|season|s)[\s\-_]*\d+/gi, "")
      .replace(/[\s\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*\d+/gi, "")
      .replace(/[\s\-_]*(مترجم[ةه]?|مدبلج[ةه]?)/gi, "")
      .replace(/[\s\-_]*(19|20)\d{2}/g, "")
      .replace(
        /[\s\-_]*(الأول[ىة]?|الثاني[ةه]?|الثالث[ةه]?|الرابع[ةه]?|الخامس[ةه]?|السادس[ةه]?|السابع[ةه]?|الثامن[ةه]?|التاسع[ةه]?|العاشر[ةه]?)/gi,
        "",
      )
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (slug) {
      info.title = slug
        .split(" ")
        .map((w) =>
          /^[a-zA-Z]/.test(w)
            ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
            : w,
        )
        .join(" ");
    }
    return info;
  }

  function extractFromHTML(html) {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const ul = doc.querySelector("ul#download");
      if (!ul || !ul.querySelectorAll("a").length) return null;

      const groups = {};
      ul.querySelectorAll("li").forEach((li) => {
        const spanEl = li.querySelector("span");
        if (!spanEl) return;
        const groupName = spanEl.textContent.replace(/[:\s]+$/, "").trim();
        if (!groupName) return;
        if (!groups[groupName]) groups[groupName] = [];

        li.querySelectorAll("a").forEach((a) => {
          const rawHref = a.getAttribute("href");
          if (!rawHref || rawHref === "#") return;

          let linkText = "";
          a.childNodes.forEach((n) => {
            if (n.nodeType === 3) linkText += n.textContent;
          });
          linkText = linkText.trim();

          const qm = linkText.match(/(360|480|720|1080)/);
          const quality = qm ? qm[0] + "p" : null;
          const pEl = a.querySelector("p");
          const size = pEl ? pEl.textContent.trim() : "";
          const url = rawHref
            .replace(/^https?:\/\/href\.li\/\?/, "")
            .replace(/&amp;/g, "&");

          groups[groupName].push({
            quality,
            name: linkText || "Download",
            size,
            url,
          });
        });
      });

      // Try to grab page title
      const h1 = doc.querySelector("h1");
      if (h1) {
        extractFromHTML._pageTitle = h1.textContent
          .replace(
            /مشاهدة|تحميل|اونلاين|مترجم[ةه]?|مدبلج[ةه]?|cimanow|سيما\s*ناو/gi,
            "",
          )
          .replace(/[-|–—:]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }

      return Object.keys(groups).length ? groups : null;
    } catch (e) {
      return null;
    }
  }

  function getQM(q) {
    const map = {
      "1080p": {
        label: "1080p",
        tag: "FULL HD",
        color: "#10b981",
        border: "rgba(16,185,129,0.25)",
        bg: "rgba(16,185,129,0.08)",
        tier: 4,
      },
      "720p": {
        label: "720p",
        tag: "HD",
        color: "#3b82f6",
        border: "rgba(59,130,246,0.25)",
        bg: "rgba(59,130,246,0.08)",
        tier: 3,
      },
      "480p": {
        label: "480p",
        tag: "SD",
        color: "#f59e0b",
        border: "rgba(245,158,11,0.25)",
        bg: "rgba(245,158,11,0.08)",
        tier: 2,
      },
      "360p": {
        label: "360p",
        tag: "LOW",
        color: "#ef4444",
        border: "rgba(239,68,68,0.25)",
        bg: "rgba(239,68,68,0.08)",
        tier: 1,
      },
    };
    return (
      map[q] || {
        label: q || "Link",
        tag: "",
        color: "#8b5cf6",
        border: "rgba(139,92,246,0.25)",
        bg: "rgba(139,92,246,0.08)",
        tier: 0,
      }
    );
  }

  function launchUI(data) {
    const media = extractMediaInfo();
    if (extractFromHTML._pageTitle && !media.title)
      media.title = extractFromHTML._pageTitle;

    const totalLinks = Object.values(data).flat().length;
    const totalGroups = Object.keys(data).length;
    const bestQuality =
      Object.values(data)
        .flat()
        .filter((i) => i.quality)
        .sort((a, b) => parseInt(b.quality) - parseInt(a.quality))[0]
        ?.quality || "N/A";
    const hasSE =
      media.type !== "movie" &&
      (media.season !== null || media.episode !== null);

    const groupsHTML = Object.entries(data)
      .map(([title, items]) => {
        const qi = items
          .filter((i) => i.quality)
          .sort((a, b) => getQM(b.quality).tier - getQM(a.quality).tier);
        const oi = items.filter((i) => !i.quality);

        const qCards = qi
          .map((item, i) => {
            const m = getQM(item.quality);
            const isBest = i === 0 && m.tier >= 3;
            return `<a href="${item.url}" target="_blank" rel="noopener" class="qc${isBest ? " qc-best" : ""}" style="--ac:${m.color};--ab:${m.bg};--abr:${m.border}">
          <div class="qc-glow"></div>
          ${isBest ? '<div class="qc-flag">BEST</div>' : ""}
          <div class="qc-ico" style="background:${m.bg};border-color:${m.border}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${m.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
          <div class="qc-q">${m.label}</div>
          ${item.size ? '<div class="qc-sz">' + item.size + "</div>" : ""}
          ${m.tag ? '<div class="qc-tag" style="color:' + m.color + ";background:" + m.bg + ";border-color:" + m.border + '">' + m.tag + "</div>" : ""}
          <div class="qc-dl"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>
        </a>`;
          })
          .join("");

        const oCards = oi
          .map(
            (
              item,
            ) => `<a href="${item.url}" target="_blank" rel="noopener" class="ol">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        <span>${item.name || "Download"}</span>
      </a>`,
          )
          .join("");

        return `<div class="grp">
        <div class="grp-h">
          <div class="grp-ico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg></div>
          <div class="grp-title">${title}</div>
          <div class="grp-cnt">${items.length} ${items.length === 1 ? "رابط" : "روابط"}</div>
        </div>
        ${qCards ? '<div class="qg">' + qCards + "</div>" : ""}
        ${oCards ? '<div class="og">' + oCards + "</div>" : ""}
      </div>`;
      })
      .join("");

    const fullHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5.0">
<title>${media.title || "CimaNow"} — تحميل مباشر</title>
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  background:#06060f;color:#f0f0ff;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,sans-serif;
  min-height:100vh;overflow-x:hidden;
  -webkit-font-smoothing:antialiased;line-height:1.5;
}
a{text-decoration:none;color:inherit;-webkit-tap-highlight-color:transparent}

body::before{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(ellipse 80% 50% at 15% 10%,rgba(99,102,241,.1),transparent 60%),
    radial-gradient(ellipse 60% 50% at 85% 90%,rgba(34,211,238,.06),transparent 50%),
    radial-gradient(ellipse 50% 50% at 50% 50%,rgba(168,85,247,.04),transparent 40%);
}
body::after{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px);
  background-size:60px 60px;
  mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);
  -webkit-mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);
}

.page{position:relative;z-index:2;max-width:860px;margin:0 auto;padding:clamp(28px,5vw,48px) clamp(14px,3vw,24px) 60px}

.hero{display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:clamp(28px,5vw,48px);animation:fadeUp .6s ease both}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:100px;padding:8px 20px;margin-bottom:18px;font-size:11px;font-weight:600;color:#22d3ee;letter-spacing:.06em;text-transform:uppercase}
.dot{width:7px;height:7px;border-radius:50%;background:#22d3ee;animation:pulse 2s ease infinite}
.hero-ico{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:15px;background:linear-gradient(135deg,rgba(99,102,241,.14),rgba(139,92,246,.07));border:1px solid rgba(99,102,241,.2);color:#a5b4fc;margin-bottom:14px}
.hero h1{font-size:clamp(22px,5vw,38px);font-weight:900;background:linear-gradient(135deg,#fff,rgba(255,255,255,.55));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.2;margin-bottom:6px;word-break:break-word}
.hero-se{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;margin-top:10px;margin-bottom:6px}
.chip{display:inline-flex;align-items:center;padding:5px 13px;border-radius:8px;font-size:11px;font-weight:800;color:#fff;line-height:1.3}
.chip-s{background:linear-gradient(135deg,#6366f1,#4f46e5)}
.chip-e{background:linear-gradient(135deg,#06b6d4,#0891b2)}
.chip-t{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.22);color:#fbbf24;font-weight:600}
.chip-y{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.35);font-weight:600;font-size:10px}
.hero p{font-size:clamp(13px,2vw,15px);color:rgba(255,255,255,.5);max-width:460px;line-height:1.7}

.stats{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:clamp(28px,4vw,40px);animation:fadeUp .6s ease .12s both}
.stat{display:flex;align-items:center;gap:10px;padding:clamp(8px,1.5vw,12px) clamp(14px,2.5vw,18px);border-radius:14px;background:#10102a;border:1px solid rgba(255,255,255,.08)}
.stat-ico{width:34px;height:34px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.stat-body{display:flex;flex-direction:column}
.stat-v{font-size:clamp(15px,2.5vw,17px);font-weight:700;line-height:1.2}
.stat-l{font-size:10px;color:rgba(255,255,255,.3);margin-top:1px}

.grp{background:#10102a;border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;margin-bottom:18px;animation:fadeUp .5s ease both;transition:border-color .3s,box-shadow .3s}
.grp:hover{border-color:rgba(99,102,241,.2);box-shadow:0 8px 36px rgba(99,102,241,.06)}
.grp-h{display:flex;align-items:center;gap:12px;padding:clamp(14px,2.5vw,20px) clamp(16px,3vw,24px);border-bottom:1px solid rgba(255,255,255,.04)}
.grp-ico{width:38px;height:38px;border-radius:12px;flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,.15),rgba(99,102,241,.05));border:1px solid rgba(99,102,241,.15);display:flex;align-items:center;justify-content:center;color:#6366f1}
.grp-title{font-size:clamp(13px,2vw,15px);font-weight:700;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.grp-cnt{font-size:11px;font-weight:600;color:rgba(255,255,255,.3);background:rgba(255,255,255,.04);padding:5px 12px;border-radius:100px;border:1px solid rgba(255,255,255,.04);flex-shrink:0}

.qg{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(100px,22vw,140px),1fr));gap:10px;padding:clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)}
.qc{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding:clamp(14px,2.5vw,20px) clamp(10px,2vw,20px) clamp(12px,2vw,16px);border-radius:16px;background:#161638;border:1px solid var(--abr,rgba(255,255,255,.08));color:#fff;cursor:pointer;transition:transform .2s,box-shadow .25s,border-color .25s;animation:fadeUp .4s ease both;min-height:44px}
.qc:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,.4),0 0 0 1px var(--ac);border-color:var(--ac)}
.qc:active{transform:translateY(-1px)}
.qc-glow{position:absolute;top:-50%;left:50%;transform:translateX(-50%);width:140%;height:100%;border-radius:50%;background:radial-gradient(ellipse,var(--ab),transparent 70%);opacity:0;transition:opacity .3s;pointer-events:none}
.qc:hover .qc-glow{opacity:1}
.qc-best{background:linear-gradient(145deg,rgba(16,185,129,.08),#161638);border-color:rgba(16,185,129,.3)}
.qc-best:hover{box-shadow:0 12px 36px rgba(16,185,129,.15),0 0 0 1px rgba(16,185,129,.5)}
.qc-flag{position:absolute;top:7px;right:7px;background:linear-gradient(135deg,#f59e0b,#f97316);color:#000;font-size:7px;font-weight:900;letter-spacing:.06em;padding:2px 7px;border-radius:5px;line-height:1.4}
.qc-ico{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;border:1.5px solid;margin-bottom:8px;transition:transform .2s}
.qc:hover .qc-ico{transform:scale(1.08)}
.qc-q{font-size:clamp(18px,3.5vw,22px);font-weight:800;letter-spacing:-.02em}
.qc-sz{font-size:10px;color:rgba(255,255,255,.3);margin-top:4px}
.qc-tag{font-size:9px;font-weight:700;letter-spacing:.1em;padding:3px 10px;border-radius:6px;border:1px solid;margin-top:8px}
.qc-dl{margin-top:10px;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.3);transition:background .2s,color .2s,transform .2s}
.qc:hover .qc-dl{background:var(--ab);color:var(--ac);transform:scale(1.1)}

.og{display:flex;flex-wrap:wrap;gap:8px;padding:0 clamp(16px,3vw,24px) clamp(14px,2.5vw,20px)}
.qg+.og{padding-top:0}
.og:first-child{padding-top:clamp(14px,2.5vw,20px)}
.ol{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:11px;background:rgba(139,92,246,.06);border:1px solid rgba(139,92,246,.12);color:#a78bfa;font-size:12px;font-weight:500;transition:background .15s,border-color .15s,transform .15s;animation:fadeUp .4s ease both;min-height:44px}
.ol:hover{background:rgba(139,92,246,.14);border-color:rgba(139,92,246,.3);transform:translateY(-1px)}

.ft{display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;margin-top:clamp(32px,5vw,48px);padding-top:28px;border-top:1px solid rgba(255,255,255,.04);animation:fadeUp .5s ease .4s both}
.ft-brand{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:rgba(255,255,255,.25)}
.ft-brand svg{opacity:.4}
.ft-links{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap}
.ft-link{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;font-size:11px;font-weight:600;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.4);transition:background .15s,border-color .15s,color .15s,transform .15s;min-height:44px}
.ft-link:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);color:rgba(255,255,255,.7);transform:translateY(-1px)}
.ft-link svg{flex-shrink:0;opacity:.7}
.ft-link:hover svg{opacity:1}
.ft small{font-size:10px;color:rgba(255,255,255,.1)}

@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}

::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:10px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.15)}

@media(max-width:480px){
  .qg{grid-template-columns:repeat(2,1fr);gap:8px}
  .qc{padding:12px 8px 10px}
  .qc-ico{width:34px;height:34px;border-radius:9px}
  .qc-ico svg{width:14px;height:14px}
  .qc-q{font-size:17px}
  .stat{padding:8px 12px}
  .grp-h{padding:14px 16px}
  .qg,.og{padding-left:16px;padding-right:16px}
  .hero-ico{width:44px;height:44px;border-radius:13px}
  .hero-ico svg{width:18px;height:18px}
  .ft-links{gap:6px}
  .ft-link{padding:7px 12px;font-size:10px}
}
@media(min-width:481px) and (max-width:700px){.qg{grid-template-columns:repeat(3,1fr)}}
@media(min-width:701px){.qg{grid-template-columns:repeat(4,1fr)}}
</style>
</head>
<body>
<div class="page">
  <div class="hero">
    <div class="hero-badge"><span class="dot"></span>CimaNow Bypass — Active</div>
    <div class="hero-ico">
      ${
        media.type === "series" || media.type === "anime"
          ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>'
          : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
      }
    </div>
    <h1>${media.title || "روابط التحميل المباشرة"}</h1>
    ${
      hasSE || media.trans || media.year
        ? '<div class="hero-se">' +
          (hasSE && media.season !== null
            ? '<span class="chip chip-s">الموسم ' + media.season + "</span>"
            : "") +
          (hasSE && media.episode !== null
            ? '<span class="chip chip-e">الحلقة ' + media.episode + "</span>"
            : "") +
          (media.trans
            ? '<span class="chip chip-t">' + media.trans + "</span>"
            : "") +
          (media.year
            ? '<span class="chip chip-y">' + media.year + "</span>"
            : "") +
          "</div>"
        : ""
    }
    <p>تم استخراج جميع الروابط تلقائيًا — اختر الجودة والسيرفر المناسب</p>
  </div>

  <div class="stats">
    <div class="stat">
      <div class="stat-ico" style="background:rgba(99,102,241,.12);color:#818cf8"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg></div>
      <div class="stat-body"><div class="stat-v">${totalGroups}</div><div class="stat-l">سيرفرات</div></div>
    </div>
    <div class="stat">
      <div class="stat-ico" style="background:rgba(34,211,238,.12);color:#22d3ee"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
      <div class="stat-body"><div class="stat-v">${totalLinks}</div><div class="stat-l">روابط</div></div>
    </div>
    <div class="stat">
      <div class="stat-ico" style="background:rgba(16,185,129,.12);color:#34d399"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <div class="stat-body"><div class="stat-v">${bestQuality}</div><div class="stat-l">أفضل جودة</div></div>
    </div>
  </div>

  ${groupsHTML}

  <div class="ft">
    <div class="ft-brand">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      Ezio Auditore — CimaNow Bypass
    </div>
    <div class="ft-links">
      <a href="https://github.com/EzioTheGoat/EzioUserscripts" target="_blank" rel="noopener" class="ft-link">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
      <a href="https://t.me/EzioTheGoatScripts" target="_blank" rel="noopener" class="ft-link">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        Telegram
      </a>
    </div>
    <small>مجاني ومفتوح المصدر — ${new Date().getFullYear()}</small>
  </div>
</div>
</body>
</html>`;

    try {
      const blob = new _Blob([fullHTML], { type: "text/html;charset=utf-8" });
      const blobURL = _createObjectURL(blob);
      _log(
        "[CimaNow Bypass] ✅ Navigating to blob URL — site has zero control now.",
      );
      location.replace(blobURL);
    } catch (e) {
      _log("[CimaNow Bypass] Blob redirect failed, trying window.open...");
      try {
        const blob = new _Blob([fullHTML], { type: "text/html;charset=utf-8" });
        const blobURL = _createObjectURL(blob);
        window.open(blobURL, "_self");
      } catch (e2) {
        _log(
          "[CimaNow Bypass] All blob methods failed, using document.write fallback...",
        );
        window.stop();
        document.open();
        document.write(fullHTML);
        document.close();
      }
    }
  }

  const _origWrite = document.write.bind(document);
  const _origWriteln = document.writeln.bind(document);

  document.write = function (html) {
    if (!extracted && typeof html === "string" && html.length > 1000) {
      const data = extractFromHTML(html);
      if (data) {
        extracted = true;
        _log(
          "[CimaNow Bypass] ✅ Extracted " +
            Object.values(data).flat().length +
            " links. Leaving site...",
        );
        _setTimeout(() => launchUI(data), 0);
        return;
      }
    }
    return _origWrite(html);
  };

  document.writeln = function (html) {
    if (!extracted && typeof html === "string" && html.length > 1000) {
      const data = extractFromHTML(html);
      if (data) {
        extracted = true;
        _log("[CimaNow Bypass] ✅ Extracted via writeln. Leaving site...");
        _setTimeout(() => launchUI(data), 0);
        return;
      }
    }
    return _origWriteln(html);
  };

  _log("[CimaNow Bypass] ⏳ Interceptor ready. Waiting for decoded HTML...");
})();


