// ==UserScript==
// @name         Bypass CimaNow — UI
// @namespace    Ezio Scripts
// @version      2.1
// @description  Extracts download links from CimaNow watch pages and displays them in a premium UI
// @match        *://*.cimanow.cc/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const _log = console.log.bind(console);
  const _setTimeout = window.setTimeout.bind(window);
  const _DOMParser = window.DOMParser;

  const _getElementById = Document.prototype.getElementById;
  const _elQS = Element.prototype.querySelector;
  const _elQSA = Element.prototype.querySelectorAll;
  const _getAttribute = Element.prototype.getAttribute;

  const _getInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML")?.get;
  const _getTextContent = Object.getOwnPropertyDescriptor(Node.prototype, "textContent")?.get;
  const _getNodeType = Object.getOwnPropertyDescriptor(Node.prototype, "nodeType")?.get;

  function $id(i) { try { return _getElementById.call(document, i); } catch(e) { return null; } }
  function $qs(el, sel) { try { return _elQS.call(el, sel); } catch(e) { return null; } }
  function $qsa(el, sel) { try { return _elQSA.call(el, sel); } catch(e) { return []; } }
  function $attr(el, a) { try { return _getAttribute.call(el, a); } catch(e) { return null; } }
  function $html(el) { try { return _getInnerHTML ? _getInnerHTML.call(el) : ""; } catch(e) { return ""; } }
  function $text(el) { try { return _getTextContent ? _getTextContent.call(el) : ""; } catch(e) { return ""; } }

  const isWatchPage = location.pathname.includes("/watching/") && location.search.includes("token=");
  if (!isWatchPage) return;

  _log("[CimaNow Bypass] ⏳ Watch page detected.");

  const UI_PAGE = "https://eziothegoat.github.io/dl/cimanow.html";
  const DATA_KEY = "ezio_cimanow_data";
  const CHANNEL_NAME = "ezio_cimanow_channel";

  const arabicOrdinals = {
    "الاولى":1,"الأولى":1,"اولى":1,"أولى":1,"الاول":1,"الأول":1,
    "الثانية":2,"ثانية":2,"الثاني":2,"ثاني":2,
    "الثالثة":3,"ثالثة":3,"الثالث":3,"ثالث":3,
    "الرابعة":4,"رابعة":4,"الرابع":4,"رابع":4,
    "الخامسة":5,"خامسة":5,"الخامس":5,"خامس":5,
    "السادسة":6,"سادسة":6,"السادس":6,"سادس":6,
    "السابعة":7,"سابعة":7,"السابع":7,"سابع":7,
    "الثامنة":8,"ثامنة":8,"الثامن":8,"ثامن":8,
    "التاسعة":9,"تاسعة":9,"التاسع":9,"تاسع":9,
    "العاشرة":10,"عاشرة":10,"العاشر":10,"عاشر":10
  };
  const arabicCompoundOrdinals = {
    "الحادية عشرة":11,"الحادي عشر":11,"الحادية عشر":11,
    "الثانية عشرة":12,"الثاني عشر":12,"الثانية عشر":12,
    "الثالثة عشرة":13,"الثالث عشر":13,"الثالثة عشر":13,
    "الرابعة عشرة":14,"الرابع عشر":14,"الرابعة عشر":14,
    "الخامسة عشرة":15,"الخامس عشر":15,"الخامسة عشر":15,
    "السادسة عشرة":16,"السادس عشر":16,"السادسة عشر":16,
    "السابعة عشرة":17,"السابع عشر":17,"السابعة عشر":17,
    "الثامنة عشرة":18,"الثامن عشر":18,"الثامنة عشر":18,
    "التاسعة عشرة":19,"التاسع عشر":19,"التاسعة عشر":19
  };
  const arabicTens = {
    "العشرون":20,"العشرين":20,"عشرون":20,"عشرين":20,
    "الثلاثون":30,"الثلاثين":30,"ثلاثون":30,"ثلاثين":30,
    "الاربعون":40,"الأربعون":40,"الاربعين":40,"الأربعين":40,"اربعون":40,"أربعون":40,"اربعين":40,"أربعين":40,
    "الخمسون":50,"الخمسين":50,"خمسون":50,"خمسين":50,
    "الستون":60,"الستين":60,"ستون":60,"ستين":60,
    "السبعون":70,"السبعين":70,"سبعون":70,"سبعين":70,
    "الثمانون":80,"الثمانين":80,"ثمانون":80,"ثمانين":80,
    "التسعون":90,"التسعين":90,"تسعون":90,"تسعين":90
  };
  const arabicUnits = {
    "الحادية":1,"الحادي":1,"حادية":1,"حادي":1,
    "الثانية":2,"الثاني":2,"ثانية":2,"ثاني":2,
    "الثالثة":3,"الثالث":3,"ثالثة":3,"ثالث":3,
    "الرابعة":4,"الرابع":4,"رابعة":4,"رابع":4,
    "الخامسة":5,"الخامس":5,"خامسة":5,"خامس":5,
    "السادسة":6,"السادس":6,"سادسة":6,"سادس":6,
    "السابعة":7,"السابع":7,"سابعة":7,"سابع":7,
    "الثامنة":8,"الثامن":8,"ثامنة":8,"ثامن":8,
    "التاسعة":9,"التاسع":9,"تاسعة":9,"تاسع":9
  };

  const ordinalWords = Object.keys(arabicOrdinals).sort((a, b) => b.length - a.length).join("|");
  const compoundOrdinalWords = Object.keys(arabicCompoundOrdinals).sort((a, b) => b.length - a.length).join("|");
  const tensWords = Object.keys(arabicTens).sort((a, b) => b.length - a.length).join("|");
  const unitsWords = Object.keys(arabicUnits).sort((a, b) => b.length - a.length).join("|");

  function parseArabicNumber(txt) {
    for (const [key, val] of Object.entries(arabicCompoundOrdinals)) {
      if (txt.includes(key)) return { value: val, matched: key };
    }
    const compoundRe = new RegExp(`(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})`, "i");
    const cm = txt.match(compoundRe);
    if (cm) return { value: (arabicUnits[cm[1]] || 0) + (arabicTens[cm[2]] || 0), matched: cm[0] };
    for (const [key, val] of Object.entries(arabicTens)) {
      if (txt.includes(key)) return { value: val, matched: key };
    }
    for (const key of Object.keys(arabicOrdinals).sort((a, b) => b.length - a.length)) {
      if (txt.includes(key)) return { value: arabicOrdinals[key], matched: key };
    }
    return null;
  }

  function extractMediaInfo() {
    const path = decodeURIComponent(location.pathname);
    const info = { title: "", type: "movie", season: null, episode: null, trans: "", year: null };
    let cleaned = path.replace(/\/watching\/?/gi, "").replace(/^\/+|\/+$/g, "").replace(/-/g, " ");

    if (/مسلسل|series/i.test(cleaned)) info.type = "series";
    else if (/فيلم|movie|film/i.test(cleaned)) info.type = "movie";
    else if (/برنامج|program/i.test(cleaned)) info.type = "show";
    else if (/انمي|anime/i.test(cleaned)) info.type = "anime";

    const smN = cleaned.match(/(?:ج|جزء|موسم|الموسم|season|s)[\s\-_]*(\d+)/i);
    if (smN) { info.season = parseInt(smN[1]); }
    else {
      const sp = cleaned.match(/(?:ج|جزء|موسم|الموسم|season|s)[\s\-_]*/i);
      if (sp) { const p = parseArabicNumber(cleaned.slice(sp.index + sp[0].length)); if (p) info.season = p.value; }
    }

    const emN = cleaned.match(/(?:ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*(\d+)/i);
    if (emN) { info.episode = parseInt(emN[1]); }
    else {
      const ep = cleaned.match(/(?:ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*/i);
      if (ep) { const p = parseArabicNumber(cleaned.slice(ep.index + ep[0].length)); if (p) info.episode = p.value; }
    }

    if (info.season === null && info.episode === null) {
      const p = parseArabicNumber(cleaned);
      if (p) info.season = p.value;
    }
    if (info.season !== null || info.episode !== null) info.type = "series";
    if (info.type === "movie") { info.season = null; info.episode = null; }

    if (/مترجم/.test(cleaned)) info.trans = "مترجم";
    else if (/مدبلج/.test(cleaned)) info.trans = "مدبلج";

    const ymAll = cleaned.match(/\b(19|20)\d{2}\b/g);
    if (ymAll) info.year = ymAll[ymAll.length - 1];

    let slug = cleaned;
    slug = slug.replace(/^(مسلسل|فيلم|برنامج|انمي)[\s\-_]*/i, "");
    slug = slug.replace(/[\s\-_]*(ج|جزء|موسم|الموسم|season|s)[\s\-_]*\d+/gi, "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(ج|جزء|موسم|الموسم|season|s)[\\s\\-_]*(${compoundOrdinalWords})`, "gi"), "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(ج|جزء|موسم|الموسم|season|s)[\\s\\-_]*(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})`, "gi"), "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(ج|جزء|موسم|الموسم|season|s)[\\s\\-_]*(${tensWords})`, "gi"), "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(ج|جزء|موسم|الموسم|season|s)[\\s\\-_]*(${ordinalWords})`, "gi"), "");
    slug = slug.replace(/[\s\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*\d+/gi, "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\\s\\-_]*(${compoundOrdinalWords})`, "gi"), "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\\s\\-_]*(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})`, "gi"), "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\\s\\-_]*(${tensWords})`, "gi"), "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(ح|حلقة|الحلقة|episode|ep|e)[\\s\\-_]*(${ordinalWords})`, "gi"), "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})(?=[\\s\\-_]|$)`, "gi"), "");
    slug = slug.replace(new RegExp(`[\\s\\-_]*(${compoundOrdinalWords})(?=[\\s\\-_]|$)`, "gi"), "");
    slug = slug.replace(new RegExp(`(?:^|[\\s\\-_])(${tensWords})(?=[\\s\\-_]|$)`, "gi"), "");
    slug = slug.replace(new RegExp(`(?:^|[\\s\\-_])(${ordinalWords})(?=[\\s\\-_]|$)`, "gi"), "");
    slug = slug.replace(/[\s\-_]*(مترجم[ةه]?|مدبلج[ةه]?)/gi, "");
    if (info.year) {
      const yi = slug.lastIndexOf(info.year);
      if (yi !== -1) slug = slug.slice(0, yi) + slug.slice(yi + info.year.length);
    }
    slug = slug.replace(/\s+/g, " ").trim();
    if (slug) {
      info.title = slug.split(" ").map(w =>
        /^[a-zA-Z]/.test(w) ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w
      ).join(" ");
    }
    return info;
  }

  function extractFromDownloadUL(ulInnerHTML) {
    try {
      const parser = new _DOMParser();
      const doc = parser.parseFromString(
        "<html><body><ul id='download'>" + ulInnerHTML + "</ul></body></html>",
        "text/html"
      );
      const ul = doc.querySelector("ul#download");
      if (!ul) return null;
      if (!ul.querySelectorAll("a").length) return null;

      const groups = {};
      ul.querySelectorAll("li").forEach(function(li, liIdx) {
        const span = li.querySelector("span");
        const groupName = span ? span.textContent.replace(/[:\s]+$/, "").trim() : ("Group " + liIdx);
        if (!groupName) return;
        if (!groups[groupName]) groups[groupName] = [];

        li.querySelectorAll("a").forEach(function(a) {
          const href = a.getAttribute("href");
          if (!href || href === "#") return;
          let linkText = "";
          a.childNodes.forEach(function(n) {
            if (n.nodeType === 3) linkText += n.textContent;
          });
          linkText = linkText.trim();
          const qm = linkText.match(/(360|480|720|1080)/);
          const quality = qm ? qm[0] + "p" : null;
          const pEl = a.querySelector("p");
          const size = pEl ? pEl.textContent.trim() : "";
          const url = href.replace(/^https?:\/\/href\.li\/\?/, "").replace(/&amp;/g, "&");
          groups[groupName].push({ quality: quality, name: linkText || "Download", size: size, url: url });
        });
      });

      return Object.keys(groups).length ? groups : null;
    } catch(e) {
      _log("[CimaNow Bypass] ❌ Parse error:", e.message);
      return null;
    }
  }

  function sendDataToUI(data) {
    const media = extractMediaInfo();
    const payload = { links: data, media: media, timestamp: Date.now() };

    _log("[CimaNow Bypass] 📤 Sending data to UI page...");

    try {
      localStorage.setItem(DATA_KEY, JSON.stringify(payload));
      _log("[CimaNow Bypass] ✅ Data saved to localStorage");
    } catch(e) {
      _log("[CimaNow Bypass] ⚠️ localStorage save failed:", e.message);
    }

    try {
      var bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage({ type: "ezio_cimanow_payload", payload: payload });
      _log("[CimaNow Bypass] ✅ BroadcastChannel sent");
      _setTimeout(function() { bc.close(); }, 2000);
    } catch(e) {
      _log("[CimaNow Bypass] ⚠️ BroadcastChannel failed:", e.message);
    }

    var encodedPayload = "";
    try {
      encodedPayload = btoa(encodeURIComponent(JSON.stringify(payload)));
    } catch(e) {}

    var targetURL;
    if (encodedPayload.length > 0 && encodedPayload.length < 8000) {
      targetURL = UI_PAGE + "#" + encodedPayload;
      _log("[CimaNow Bypass] 📎 Using hash method (size: " + encodedPayload.length + ")");
    } else {
      targetURL = UI_PAGE;
      _log("[CimaNow Bypass] 📎 Using localStorage method (payload too large for hash)");
    }

    _setTimeout(function() {
      _log("[CimaNow Bypass] 🚀 Redirecting to: " + UI_PAGE);
      location.replace(targetURL);
    }, 300);
  }

  let extracted = false;

  function tryExtractFromElement(el) {
    if (extracted) return;
    const h = $html(el);
    if (!h || h.length < 50) return;
    const data = extractFromDownloadUL(h);
    if (data) {
      extracted = true;
      const total = Object.values(data).flat().length;
      _log("[CimaNow Bypass] ✅ Extracted " + total + " links from " + Object.keys(data).length + " groups.");
      _setTimeout(function() { sendDataToUI(data); }, 0);
    }
  }

  _setTimeout(function() {
    const obs = new MutationObserver(function(mutations) {
      if (extracted) return;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          try {
            const nt = _getNodeType ? _getNodeType.call(node) : node.nodeType;
            if (nt !== 1) continue;
            const nodeId = $attr(node, "id");
            if (nodeId === "download") {
              _log("[CimaNow Bypass] 🎯 MutationObserver caught #download!");
              tryExtractFromElement(node);
              if (extracted) { obs.disconnect(); return; }
            }
            try {
              const inner = _elQS.call(node, "#download");
              if (inner) {
                _log("[CimaNow Bypass] 🎯 Found #download inside added node!");
                tryExtractFromElement(inner);
                if (extracted) { obs.disconnect(); return; }
              }
            } catch(e) {}
          } catch(e) {}
        }
      }
    });

    if (document.documentElement) {
      obs.observe(document.documentElement, { childList: true, subtree: true });
      _log("[CimaNow Bypass] 👁️ MutationObserver active — v2.0");
    }
    _setTimeout(function() { obs.disconnect(); }, 60000);
  }, 0);

  let pollCount = 0;
  const poller = window.setInterval(function() {
    if (extracted) { window.clearInterval(poller); return; }
    pollCount++;

    if (pollCount > 60) {
      window.clearInterval(poller);
      _log("[CimaNow Bypass] ⏰ Polling timed out after 30s.");
      showTimeoutPage();
      return;
    }

    try {
      const ul = _getElementById.call(document, "download");
      if (ul) {
        _log("[CimaNow Bypass] 🎯 Polling found #download!");
        tryExtractFromElement(ul);
      }
    } catch(e) {}
  }, 500);

  function showTimeoutPage() {
    var timeoutHTML = '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>CimaNow Bypass — Timeout</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">' +
      '<style>' +
      '*{margin:0;padding:0;box-sizing:border-box}' +
      'body{background:#030014;color:#f0f0ff;font-family:"Tajawal",sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}' +
      'body::before{content:"";position:fixed;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(239,68,68,.08),transparent 60%),radial-gradient(ellipse 80% 50% at 20% 80%,rgba(99,102,241,.06),transparent 50%)}' +
      '.tc{position:relative;z-index:2;text-align:center;max-width:480px;padding:48px 36px;background:rgba(15,15,40,.8);border:1px solid rgba(239,68,68,.15);border-radius:28px;backdrop-filter:blur(24px);animation:fi .6s ease both}' +
      '@keyframes fi{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}' +
      '.ti{width:72px;height:72px;border-radius:22px;margin:0 auto 24px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);display:flex;align-items:center;justify-content:center;color:#f87171}' +
      '.tc h2{font-size:24px;font-weight:900;margin-bottom:12px;background:linear-gradient(135deg,#fff,rgba(248,113,113,.8));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}' +
      '.tc p{font-size:14px;color:rgba(255,255,255,.4);line-height:1.8;margin-bottom:28px}' +
      '.ta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}' +
      '.tb{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;border:none;font-family:inherit;transition:all .3s;min-height:48px}' +
      '.tp{background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;box-shadow:0 8px 32px rgba(99,102,241,.3)}' +
      '.tp:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(99,102,241,.4)}' +
      '.ts{background:rgba(255,255,255,.04);color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.08)}' +
      '.ts:hover{background:rgba(255,255,255,.08);color:#fff;transform:translateY(-3px)}' +
      '.th{margin-top:20px;font-size:11px;color:rgba(255,255,255,.15)}' +
      '</style></head><body>' +
      '<div class="tc">' +
      '<div class="ti"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>' +
      '<h2>انتهت المهلة الزمنية</h2>' +
      '<p>لم يتم العثور على روابط التحميل خلال 30 ثانية. قد يكون المحتوى غير متاح أو أن الصفحة لم تحمّل بالكامل.</p>' +
      '<div class="ta">' +
      '<button class="tb tp" onclick="location.reload()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg> إعادة المحاولة</button>' +
      '<button class="tb ts" onclick="history.back()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> رجوع</button>' +
      '</div>' +
      '<div class="th">Ezio Auditore — CimaNow Bypass v2.0</div>' +
      '</div></body></html>';

    try {
      window.stop();
      document.open();
      document.write(timeoutHTML);
      document.close();
    } catch(e) {
      try {
        var blob = new Blob([timeoutHTML], { type: "text/html;charset=utf-8" });
        location.replace(URL.createObjectURL(blob));
      } catch(e2) {}
    }
  }

  _setTimeout(function() {
    try {
      var indicator = document.createElement("div");
      indicator.id = "ezio-indicator";
      indicator.innerHTML = '<div style="position:fixed;bottom:20px;left:20px;z-index:99999;display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:14px;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.25);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:#a5b4fc;font-family:Tajawal,sans-serif;font-size:12px;font-weight:700;box-shadow:0 8px 32px rgba(0,0,0,.3);animation:ezioSlideIn .5s ease both">' +
        '<div style="width:8px;height:8px;border-radius:50%;background:#818cf8;animation:ezioPulse 1.5s ease infinite"></div>' +
        '🦅 Ezio Bypass — جارٍ استخراج الروابط...' +
        '</div>';
      var style = document.createElement("style");
      style.textContent = "@keyframes ezioSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes ezioPulse{0%,100%{opacity:1}50%{opacity:.3}}";
      document.head.appendChild(style);
      document.body.appendChild(indicator);
    } catch(e) {}
  }, 1000);

})();
