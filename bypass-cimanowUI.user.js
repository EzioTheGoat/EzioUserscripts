// ==UserScript==
// @name         Bypass CimaNow — UI
// @namespace    Ezio Scripts
// @version      1.7
// @description  Extracts download links from CimaNow watch pages and displays them in a premium UI
// @match        *://*.cimanow.cc/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const _log = console.log.bind(console);
  const _setTimeout = window.setTimeout.bind(window);
  const _Blob = window.Blob;
  const _createObjectURL = URL.createObjectURL.bind(URL);
  const _DOMParser = window.DOMParser;
  const _getElementById = Document.prototype.getElementById;
  const _elQS = Element.prototype.querySelector;
  const _elQSA = Element.prototype.querySelectorAll;
  const _getAttribute = Element.prototype.getAttribute;

  const _getInnerHTML = Object.getOwnPropertyDescriptor(
    Element.prototype,
    "innerHTML",
  )?.get;
  const _getTextContent = Object.getOwnPropertyDescriptor(
    Node.prototype,
    "textContent",
  )?.get;
  const _getNodeType = Object.getOwnPropertyDescriptor(
    Node.prototype,
    "nodeType",
  )?.get;

  function $id(id) {
    try {
      return _getElementById.call(document, id);
    } catch (e) {
      return null;
    }
  }
  function $qs(el, sel) {
    try {
      return _elQS.call(el, sel);
    } catch (e) {
      return null;
    }
  }
  function $qsa(el, sel) {
    try {
      return _elQSA.call(el, sel);
    } catch (e) {
      return [];
    }
  }
  function $attr(el, a) {
    try {
      return _getAttribute.call(el, a);
    } catch (e) {
      return null;
    }
  }
  function $html(el) {
    try {
      return _getInnerHTML ? _getInnerHTML.call(el) : "";
    } catch (e) {
      return "";
    }
  }
  function $text(el) {
    try {
      return _getTextContent ? _getTextContent.call(el) : "";
    } catch (e) {
      return "";
    }
  }

  const isWatchPage =
    location.pathname.includes("/watching/") &&
    location.search.includes("token=");

  if (!isWatchPage) return;

  _log(
    "[CimaNow Bypass] ⏳ v3.0 — Watch page detected. Waiting for #download...",
  );

  const arabicOrdinals = {
    الاولى: 1,
    الأولى: 1,
    اولى: 1,
    أولى: 1,
    الاول: 1,
    الأول: 1,
    الثانية: 2,
    ثانية: 2,
    الثاني: 2,
    ثاني: 2,
    الثالثة: 3,
    ثالثة: 3,
    الثالث: 3,
    ثالث: 3,
    الرابعة: 4,
    رابعة: 4,
    الرابع: 4,
    رابع: 4,
    الخامسة: 5,
    خامسة: 5,
    الخامس: 5,
    خامس: 5,
    السادسة: 6,
    سادسة: 6,
    السادس: 6,
    سادس: 6,
    السابعة: 7,
    سابعة: 7,
    السابع: 7,
    سابع: 7,
    الثامنة: 8,
    ثامنة: 8,
    الثامن: 8,
    ثامن: 8,
    التاسعة: 9,
    تاسعة: 9,
    التاسع: 9,
    تاسع: 9,
    العاشرة: 10,
    عاشرة: 10,
    العاشر: 10,
    عاشر: 10,
  };

  const arabicCompoundOrdinals = {
    "الحادية عشرة": 11,
    "الحادي عشر": 11,
    "الحادية عشر": 11,
    "الثانية عشرة": 12,
    "الثاني عشر": 12,
    "الثانية عشر": 12,
    "الثالثة عشرة": 13,
    "الثالث عشر": 13,
    "الثالثة عشر": 13,
    "الرابعة عشرة": 14,
    "الرابع عشر": 14,
    "الرابعة عشر": 14,
    "الخامسة عشرة": 15,
    "الخامس عشر": 15,
    "الخامسة عشر": 15,
    "السادسة عشرة": 16,
    "السادس عشر": 16,
    "السادسة عشر": 16,
    "السابعة عشرة": 17,
    "السابع عشر": 17,
    "السابعة عشر": 17,
    "الثامنة عشرة": 18,
    "الثامن عشر": 18,
    "الثامنة عشر": 18,
    "التاسعة عشرة": 19,
    "التاسع عشر": 19,
    "التاسعة عشر": 19,
  };

  const arabicTens = {
    العشرون: 20,
    العشرين: 20,
    عشرون: 20,
    عشرين: 20,
    الثلاثون: 30,
    الثلاثين: 30,
    ثلاثون: 30,
    ثلاثين: 30,
    الاربعون: 40,
    الأربعون: 40,
    الاربعين: 40,
    الأربعين: 40,
    اربعون: 40,
    أربعون: 40,
    اربعين: 40,
    أربعين: 40,
    الخمسون: 50,
    الخمسين: 50,
    خمسون: 50,
    خمسين: 50,
    الستون: 60,
    الستين: 60,
    ستون: 60,
    ستين: 60,
    السبعون: 70,
    السبعين: 70,
    سبعون: 70,
    سبعين: 70,
    الثمانون: 80,
    الثمانين: 80,
    ثمانون: 80,
    ثمانين: 80,
    التسعون: 90,
    التسعين: 90,
    تسعون: 90,
    تسعين: 90,
  };

  const arabicUnits = {
    الحادية: 1,
    الحادي: 1,
    حادية: 1,
    حادي: 1,
    الثانية: 2,
    الثاني: 2,
    ثانية: 2,
    ثاني: 2,
    الثالثة: 3,
    الثالث: 3,
    ثالثة: 3,
    ثالث: 3,
    الرابعة: 4,
    الرابع: 4,
    رابعة: 4,
    رابع: 4,
    الخامسة: 5,
    الخامس: 5,
    خامسة: 5,
    خامس: 5,
    السادسة: 6,
    السادس: 6,
    سادسة: 6,
    سادس: 6,
    السابعة: 7,
    السابع: 7,
    سابعة: 7,
    سابع: 7,
    الثامنة: 8,
    الثامن: 8,
    ثامنة: 8,
    ثامن: 8,
    التاسعة: 9,
    التاسع: 9,
    تاسعة: 9,
    تاسع: 9,
  };

  const ordinalWords = Object.keys(arabicOrdinals)
    .sort((a, b) => b.length - a.length)
    .join("|");

  const compoundOrdinalWords = Object.keys(arabicCompoundOrdinals)
    .sort((a, b) => b.length - a.length)
    .join("|");

  const tensWords = Object.keys(arabicTens)
    .sort((a, b) => b.length - a.length)
    .join("|");

  const unitsWords = Object.keys(arabicUnits)
    .sort((a, b) => b.length - a.length)
    .join("|");

  function parseArabicNumber(text) {
    for (const [key, val] of Object.entries(arabicCompoundOrdinals)) {
      if (text.includes(key)) return { value: val, matched: key };
    }

    const compoundRe = new RegExp(
      `(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})`,
      "i",
    );
    const cm = text.match(compoundRe);
    if (cm) {
      const unitVal = arabicUnits[cm[1]] || 0;
      const tensVal = arabicTens[cm[2]] || 0;
      return { value: unitVal + tensVal, matched: cm[0] };
    }

    for (const [key, val] of Object.entries(arabicTens)) {
      if (text.includes(key)) return { value: val, matched: key };
    }

    for (const key of Object.keys(arabicOrdinals).sort(
      (a, b) => b.length - a.length,
    )) {
      if (text.includes(key))
        return { value: arabicOrdinals[key], matched: key };
    }

    return null;
  }

  let extracted = false;

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

    let cleaned = path
      .replace(/\/watching\/?/gi, "")
      .replace(/^\/+|\/+$/g, "")
      .replace(/-/g, " ");

    if (/مسلسل|series/i.test(cleaned)) info.type = "series";
    else if (/فيلم|movie|film/i.test(cleaned)) info.type = "movie";
    else if (/برنامج|program/i.test(cleaned)) info.type = "show";
    else if (/انمي|anime/i.test(cleaned)) info.type = "anime";

    const smNumeric = cleaned.match(
      /(?:ج|جزء|موسم|الموسم|season|s)[\s\-_]*(\d+)/i,
    );
    if (smNumeric) {
      info.season = parseInt(smNumeric[1]);
    } else {
      const seasonPrefixRe = /(?:ج|جزء|موسم|الموسم|season|s)[\s\-_]*/i;
      const spMatch = cleaned.match(seasonPrefixRe);
      if (spMatch) {
        const afterPrefix = cleaned.slice(spMatch.index + spMatch[0].length);
        const parsed = parseArabicNumber(afterPrefix);
        if (parsed) {
          info.season = parsed.value;
        }
      }
    }

    const emNumeric = cleaned.match(
      /(?:ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*(\d+)/i,
    );
    if (emNumeric) {
      info.episode = parseInt(emNumeric[1]);
    } else {
      const epPrefixRe = /(?:ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*/i;
      const epMatch = cleaned.match(epPrefixRe);
      if (epMatch) {
        const afterPrefix = cleaned.slice(epMatch.index + epMatch[0].length);
        const parsed = parseArabicNumber(afterPrefix);
        if (parsed) {
          info.episode = parsed.value;
        }
      }
    }

    if (info.season === null && info.episode === null) {
      const parsed = parseArabicNumber(cleaned);
      if (parsed) {
        info.season = parsed.value;
      }
    }

    if (info.season !== null || info.episode !== null) info.type = "series";
    if (info.type === "movie") {
      info.season = null;
      info.episode = null;
    }

    if (/مترجم/.test(cleaned)) info.trans = "مترجم";
    else if (/مدبلج/.test(cleaned)) info.trans = "مدبلج";

    // ✅ FIX: Grab the LAST year-like number (the actual release year)
    const ymAll = cleaned.match(/\b(19|20)\d{2}\b/g);
    if (ymAll) info.year = ymAll[ymAll.length - 1];

    let slug = cleaned;

    slug = slug.replace(/^(مسلسل|فيلم|برنامج|انمي)[\s\-_]*/i, "");
    slug = slug.replace(
      /[\s\-_]*(ج|جزء|موسم|الموسم|season|s)[\s\-_]*\d+/gi,
      "",
    );
    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(ج|جزء|موسم|الموسم|season|s)[\\s\\-_]*(${compoundOrdinalWords})`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(ج|جزء|موسم|الموسم|season|s)[\\s\\-_]*(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(ج|جزء|موسم|الموسم|season|s)[\\s\\-_]*(${tensWords})`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(ج|جزء|موسم|الموسم|season|s)[\\s\\-_]*(${ordinalWords})`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      /[\s\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*\d+/gi,
      "",
    );

    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\\s\\-_]*(${compoundOrdinalWords})`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\\s\\-_]*(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\\s\\-_]*(${tensWords})`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\\s\\-_]*(${ordinalWords})`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      new RegExp(
        `[\\s\\-_]*(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})(?=[\\s\\-_]|$)`,
        "gi",
      ),
      "",
    );

    slug = slug.replace(
      new RegExp(`[\\s\\-_]*(${compoundOrdinalWords})(?=[\\s\\-_]|$)`, "gi"),
      "",
    );

    slug = slug.replace(
      new RegExp(`(?:^|[\\s\\-_])(${tensWords})(?=[\\s\\-_]|$)`, "gi"),
      "",
    );

    slug = slug.replace(
      new RegExp(`(?:^|[\\s\\-_])(${ordinalWords})(?=[\\s\\-_]|$)`, "gi"),
      "",
    );

    slug = slug.replace(/[\s\-_]*(مترجم[ةه]?|مدبلج[ةه]?)/gi, "");

    if (info.year) {
      const yearIdx = slug.lastIndexOf(info.year);
      if (yearIdx !== -1) {
        slug = slug.slice(0, yearIdx) + slug.slice(yearIdx + info.year.length);
      }
    }

    slug = slug.replace(/\s+/g, " ").trim();

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

    _log("[CimaNow Bypass] 📋 Media info:", JSON.stringify(info));
    return info;
  }

  function extractFromDownloadUL(ulInnerHTML) {
    try {
      const parser = new _DOMParser();
      const doc = parser.parseFromString(
        "<html><body><ul id='download'>" + ulInnerHTML + "</ul></body></html>",
        "text/html",
      );
      const ul = doc.querySelector("ul#download");
      if (!ul) return null;

      const anchors = ul.querySelectorAll("a");
      if (!anchors.length) return null;

      const groups = {};

      ul.querySelectorAll("li").forEach((li, liIdx) => {
        const span = li.querySelector("span");
        const groupName = span
          ? span.textContent.replace(/[:\s]+$/, "").trim()
          : "Group " + liIdx;
        if (!groupName) return;
        if (!groups[groupName]) groups[groupName] = [];

        li.querySelectorAll("a").forEach((a) => {
          const href = a.getAttribute("href");
          if (!href || href === "#") return;

          let linkText = "";
          a.childNodes.forEach((n) => {
            if (n.nodeType === 3) linkText += n.textContent;
          });
          linkText = linkText.trim();

          const qm = linkText.match(/(360|480|720|1080)/);
          const quality = qm ? qm[0] + "p" : null;
          const pEl = a.querySelector("p");
          const size = pEl ? pEl.textContent.trim() : "";
          const url = href
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

      return Object.keys(groups).length ? groups : null;
    } catch (e) {
      _log("[CimaNow Bypass] ❌ Parse error:", e.message);
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
      .map(([title, items], gi) => {
        const qi = items
          .filter((i) => i.quality)
          .sort((a, b) => getQM(b.quality).tier - getQM(a.quality).tier);
        const oi = items.filter((i) => !i.quality);

        const qCards = qi
          .map((item, i) => {
            const m = getQM(item.quality);
            const isBest = i === 0 && m.tier >= 3;
            return `<a href="${item.url}" target="_blank" rel="noopener" class="qc${isBest ? " qc-best" : ""}" style="--ac:${m.color};--ab:${m.bg};--abr:${m.border};animation-delay:${gi * 80 + i * 60}ms">
              <div class="qc-glow"></div>
              ${isBest ? '<div class="qc-flag">⭐ BEST</div>' : ""}
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
            (item) =>
              `<a href="${item.url}" target="_blank" rel="noopener" class="ol">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span>${item.name || "Download"}</span>
            </a>`,
          )
          .join("");

        return `<div class="grp" style="animation-delay:${gi * 100}ms">
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
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5.0,user-scalable=yes">
<title>Ezio Auditore Bybass</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  background:#04040e;color:#f0f0ff;
  font-family:'Tajawal',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,sans-serif;
  min-height:100vh;min-height:100dvh;overflow-x:hidden;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  line-height:1.6;
}
a{text-decoration:none;color:inherit;-webkit-tap-highlight-color:transparent}

/* ═══ Animated background ═══ */
body::before{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(ellipse 80% 50% at 15% 10%,rgba(99,102,241,.12),transparent 60%),
    radial-gradient(ellipse 60% 50% at 85% 90%,rgba(34,211,238,.07),transparent 50%),
    radial-gradient(ellipse 50% 50% at 50% 50%,rgba(168,85,247,.05),transparent 40%);
  animation:bgPulse 8s ease infinite alternate;
}
@keyframes bgPulse{
  0%{opacity:.8;filter:hue-rotate(0deg)}
  100%{opacity:1;filter:hue-rotate(15deg)}
}

body::after{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);
  background-size:60px 60px;
  mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);
  -webkit-mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);
}

.page{position:relative;z-index:2;max-width:900px;margin:0 auto;padding:clamp(24px,5vw,52px) clamp(12px,3vw,28px) 60px}

/* ═══ Hero ═══ */
.hero{display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:clamp(28px,5vw,48px);animation:fadeUp .7s cubic-bezier(.22,1,.36,1) both}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(99,102,241,.14),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:100px;padding:8px 22px;margin-bottom:20px;font-size:11px;font-weight:700;color:#22d3ee;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.dot{width:7px;height:7px;border-radius:50%;background:#22d3ee;animation:pulse 2s ease infinite;box-shadow:0 0 8px rgba(34,211,238,.5)}
.hero-ico{display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,rgba(99,102,241,.16),rgba(139,92,246,.08));border:1px solid rgba(99,102,241,.22);color:#a5b4fc;margin-bottom:16px;transition:transform .3s,box-shadow .3s}
.hero-ico:hover{transform:scale(1.05) rotate(-3deg);box-shadow:0 8px 32px rgba(99,102,241,.15)}
.hero h1{font-size:clamp(24px,5.5vw,42px);font-weight:900;background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,.6) 50%,rgba(167,139,250,.8) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.25;margin-bottom:6px;word-break:break-word}
.hero-se{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px;margin-top:12px;margin-bottom:8px}
.chip{display:inline-flex;align-items:center;padding:6px 16px;border-radius:10px;font-size:12px;font-weight:800;color:#fff;line-height:1.3;transition:transform .2s}
.chip:hover{transform:scale(1.05)}
.chip-s{background:linear-gradient(135deg,#6366f1,#4f46e5);box-shadow:0 4px 16px rgba(99,102,241,.3)}
.chip-e{background:linear-gradient(135deg,#06b6d4,#0891b2);box-shadow:0 4px 16px rgba(6,182,212,.3)}
.chip-t{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.25);color:#fbbf24;font-weight:700}
.chip-y{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);font-weight:600;font-size:11px}
.hero p{font-size:clamp(13px,2vw,15px);color:rgba(255,255,255,.45);max-width:480px;line-height:1.8}

/* ═══ Stats ═══ */
.stats{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:clamp(28px,4vw,44px);animation:fadeUp .7s cubic-bezier(.22,1,.36,1) .1s both}
.stat{display:flex;align-items:center;gap:12px;padding:clamp(10px,1.5vw,14px) clamp(16px,2.5vw,22px);border-radius:16px;background:rgba(16,16,42,.8);border:1px solid rgba(255,255,255,.06);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:transform .2s,border-color .2s,box-shadow .2s}
.stat:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.12);box-shadow:0 8px 32px rgba(0,0,0,.3)}
.stat-ico{width:38px;height:38px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.stat-body{display:flex;flex-direction:column}
.stat-v{font-size:clamp(16px,2.5vw,19px);font-weight:800;line-height:1.2}
.stat-l{font-size:10px;color:rgba(255,255,255,.28);margin-top:2px;font-weight:500}

/* ═══ Groups ═══ */
.grp{background:rgba(16,16,42,.7);border:1px solid rgba(255,255,255,.06);border-radius:22px;overflow:hidden;margin-bottom:20px;animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both;transition:border-color .3s,box-shadow .3s,transform .3s;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.grp:hover{border-color:rgba(99,102,241,.22);box-shadow:0 12px 48px rgba(99,102,241,.08);transform:translateY(-2px)}
.grp-h{display:flex;align-items:center;gap:14px;padding:clamp(16px,2.5vw,22px) clamp(18px,3vw,28px);border-bottom:1px solid rgba(255,255,255,.04)}
.grp-ico{width:42px;height:42px;border-radius:13px;flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,.18),rgba(99,102,241,.06));border:1px solid rgba(99,102,241,.18);display:flex;align-items:center;justify-content:center;color:#6366f1;transition:transform .2s}
.grp:hover .grp-ico{transform:scale(1.05)}
.grp-title{font-size:clamp(14px,2.2vw,16px);font-weight:800;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.grp-cnt{font-size:11px;font-weight:700;color:rgba(255,255,255,.3);background:rgba(255,255,255,.04);padding:6px 14px;border-radius:100px;border:1px solid rgba(255,255,255,.04);flex-shrink:0}

/* ═══ Quality Cards ═══ */
.qg{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(100px,22vw,145px),1fr));gap:12px;padding:clamp(16px,2.5vw,22px) clamp(18px,3vw,28px)}
.qc{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding:clamp(16px,2.5vw,22px) clamp(12px,2vw,20px) clamp(14px,2vw,18px);border-radius:18px;background:rgba(22,22,56,.9);border:1px solid var(--abr,rgba(255,255,255,.06));color:#fff;cursor:pointer;transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .3s,border-color .3s;animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;min-height:44px;-webkit-tap-highlight-color:transparent}
.qc:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(0,0,0,.5),0 0 0 1px var(--ac);border-color:var(--ac)}
.qc:active{transform:translateY(-2px) scale(.98)}
.qc-glow{position:absolute;top:-50%;left:50%;transform:translateX(-50%);width:140%;height:100%;border-radius:50%;background:radial-gradient(ellipse,var(--ab),transparent 70%);opacity:0;transition:opacity .4s;pointer-events:none}
.qc:hover .qc-glow{opacity:1}
.qc-best{background:linear-gradient(145deg,rgba(16,185,129,.1),rgba(22,22,56,.9));border-color:rgba(16,185,129,.3)}
.qc-best:hover{box-shadow:0 16px 48px rgba(16,185,129,.18),0 0 0 1px rgba(16,185,129,.5)}
.qc-flag{position:absolute;top:8px;right:8px;background:linear-gradient(135deg,#f59e0b,#f97316);color:#000;font-size:8px;font-weight:900;letter-spacing:.06em;padding:3px 8px;border-radius:6px;line-height:1.4;box-shadow:0 2px 8px rgba(245,158,11,.3)}
.qc-ico{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;justify-content:center;border:1.5px solid;margin-bottom:10px;transition:transform .25s}
.qc:hover .qc-ico{transform:scale(1.1)}
.qc-q{font-size:clamp(19px,3.5vw,24px);font-weight:900;letter-spacing:-.02em}
.qc-sz{font-size:10px;color:rgba(255,255,255,.28);margin-top:5px;font-weight:500}
.qc-tag{font-size:9px;font-weight:800;letter-spacing:.12em;padding:3px 12px;border-radius:7px;border:1px solid;margin-top:10px}
.qc-dl{margin-top:12px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.25);transition:all .25s}
.qc:hover .qc-dl{background:var(--ab);color:var(--ac);transform:scale(1.12);box-shadow:0 0 16px var(--ab)}

/* ═══ Other links ═══ */
.og{display:flex;flex-wrap:wrap;gap:10px;padding:0 clamp(18px,3vw,28px) clamp(16px,2.5vw,22px)}
.qg+.og{padding-top:0}
.og:first-child{padding-top:clamp(16px,2.5vw,22px)}
.ol{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:12px;background:rgba(139,92,246,.07);border:1px solid rgba(139,92,246,.14);color:#a78bfa;font-size:12.5px;font-weight:600;transition:all .2s;animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;min-height:44px}
.ol:hover{background:rgba(139,92,246,.16);border-color:rgba(139,92,246,.35);transform:translateY(-2px);box-shadow:0 8px 24px rgba(139,92,246,.1)}

/* ═══ Footer ═══ */
.ft{display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center;margin-top:clamp(36px,5vw,56px);padding-top:32px;border-top:1px solid rgba(255,255,255,.04);animation:fadeUp .6s cubic-bezier(.22,1,.36,1) .4s both}
.ft-brand{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:700;color:rgba(255,255,255,.22)}
.ft-brand svg{opacity:.35}
.ft-links{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
.ft-link{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:12px;font-size:12px;font-weight:700;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.35);transition:all .2s;min-height:44px}
.ft-link:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.14);color:rgba(255,255,255,.75);transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.2)}
.ft-link svg{flex-shrink:0;opacity:.6;transition:opacity .2s}
.ft-link:hover svg{opacity:1}
.ft small{font-size:10px;color:rgba(255,255,255,.08);font-weight:500}

/* ═══ Animations ═══ */
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}

/* ═══ Performance ═══ */
@media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}

/* ═══ Scrollbar ═══ */
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.06);border-radius:10px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.12)}
html{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.06) transparent}

/* ═══ Mobile optimizations ═══ */
@media(max-width:480px){
  .qg{grid-template-columns:repeat(2,1fr);gap:10px}
  .qc{padding:14px 10px 12px}
  .qc-ico{width:36px;height:36px;border-radius:10px}
  .qc-ico svg{width:14px;height:14px}
  .qc-q{font-size:18px}
  .stat{padding:10px 14px}
  .stat-ico{width:34px;height:34px;border-radius:10px}
  .grp-h{padding:14px 16px}
  .qg,.og{padding-left:16px;padding-right:16px}
  .hero-ico{width:48px;height:48px;border-radius:14px}
  .hero-ico svg{width:18px;height:18px}
  .ft-links{gap:8px}
  .ft-link{padding:9px 14px;font-size:11px}
  .page{padding-bottom:40px}
  .hero-badge{padding:6px 16px;font-size:10px}
  .chip{padding:5px 12px;font-size:11px}
}
@media(min-width:481px) and (max-width:700px){
  .qg{grid-template-columns:repeat(3,1fr)}
}
@media(min-width:701px){
  .qg{grid-template-columns:repeat(4,1fr)}
}

/* ═══ Touch feedback for mobile ═══ */
@media(hover:none) and (pointer:coarse){
  .qc:active{transform:scale(.96);transition-duration:.1s}
  .grp:hover{transform:none}
  .stat:hover{transform:none}
  .ol:active{transform:scale(.97)}
}

/* ═══ Landscape phone ═══ */
@media(max-height:500px) and (orientation:landscape){
  .page{padding-top:16px;padding-bottom:24px}
  .hero{margin-bottom:20px}
  .hero-ico{width:40px;height:40px}
  .stats{margin-bottom:20px}
}

/* ═══ Selection ═══ */
::selection{background:rgba(99,102,241,.3);color:#fff}
::-moz-selection{background:rgba(99,102,241,.3);color:#fff}
</style>
</head>
<body>
<div class="page">
  <div class="hero">
    <div class="hero-badge"><span class="dot"></span>CimaNow Bypass — Active</div>
    <div class="hero-ico">
      ${
        media.type === "series" || media.type === "anime"
          ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>'
          : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
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
      <div class="stat-ico" style="background:rgba(99,102,241,.14);color:#818cf8"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg></div>
      <div class="stat-body"><div class="stat-v">${totalGroups}</div><div class="stat-l">سيرفرات</div></div>
    </div>
    <div class="stat">
      <div class="stat-ico" style="background:rgba(34,211,238,.14);color:#22d3ee"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
      <div class="stat-body"><div class="stat-v">${totalLinks}</div><div class="stat-l">روابط</div></div>
    </div>
    <div class="stat">
      <div class="stat-ico" style="background:rgba(16,185,129,.14);color:#34d399"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
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
      _log("[CimaNow Bypass] ✅ Redirecting to blob URL...");
      location.replace(blobURL);
    } catch (e) {
      _log("[CimaNow Bypass] Blob failed, using document.write fallback...");
      window.stop();
      document.open();
      document.write(fullHTML);
      document.close();
    }
  }

  function tryExtractFromElement(el) {
    if (extracted) return;
    const html = $html(el);
    if (!html || html.length < 50) return;

    const data = extractFromDownloadUL(html);
    if (data) {
      extracted = true;
      const total = Object.values(data).flat().length;
      _log(
        "[CimaNow Bypass] ✅ Extracted " +
          total +
          " links from " +
          Object.keys(data).length +
          " groups. Launching UI...",
      );
      _setTimeout(() => launchUI(data), 0);
    }
  }

  _setTimeout(() => {
    const obs = new MutationObserver((mutations) => {
      if (extracted) return;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          try {
            const nt = _getNodeType ? _getNodeType.call(node) : node.nodeType;
            if (nt !== 1) continue;

            const id = $attr(node, "id");
            if (id === "download") {
              _log("[CimaNow Bypass] 🎯 MutationObserver caught #download!");
              tryExtractFromElement(node);
              if (extracted) {
                obs.disconnect();
                return;
              }
            }

            try {
              const inner = _elQS.call(node, "#download");
              if (inner) {
                _log(
                  "[CimaNow Bypass] 🎯 MutationObserver found #download inside added node!",
                );
                tryExtractFromElement(inner);
                if (extracted) {
                  obs.disconnect();
                  return;
                }
              }
            } catch (e) {}
          } catch (e) {}
        }
      }
    });

    if (document.documentElement) {
      obs.observe(document.documentElement, { childList: true, subtree: true });
      _log("[CimaNow Bypass] 👁️ MutationObserver active.");
    }

    _setTimeout(() => obs.disconnect(), 60000);
  }, 0);

  let pollCount = 0;
  const poller = window.setInterval(() => {
    if (extracted) {
      window.clearInterval(poller);
      return;
    }
    pollCount++;
    if (pollCount > 60) {
      window.clearInterval(poller);
      _log("[CimaNow Bypass] ⏰ Polling timed out after 30s.");
      return;
    }

    try {
      const ul = _getElementById.call(document, "download");
      if (ul) {
        _log("[CimaNow Bypass] 🎯 Polling found #download!");
        tryExtractFromElement(ul);
      }
    } catch (e) {}
  }, 500);
})();


