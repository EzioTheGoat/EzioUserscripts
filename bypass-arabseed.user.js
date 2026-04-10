// ==UserScript==
// @name         Bypass ArabSeed
// @name:ar      تخطي عرب سيد
// @namespace    Violentmonkey Scripts
// @version      3.0
// @description  Automatically bypass the countdown and show the download link
// @description:ar هذا السكربت مخصص لتحسين تجربتك على موقع عرب سيد من خلال تجاوز العراقيل المختلفة مثل مؤقت العد التنازلي، النوافذ المنبثقة، التحويلات المزيفة، وفتح صفحة التحميل مباشرةً. استمتع بتجربة مشاهدة سلسة دون انقطاع!
// @author       Ezio Auditore
// @license      MIT
// @icon         https://i.imgur.com/purcqbc.png
// @match        https://m.gameshop4u.com/*
// @match        https://m.gamehub.cam/*
// @match        https://adding.quest/*
// @match        https://zplay.gamezone.cam/*
// @match        https://gamestation.cam/*
// @match        https://gplay.gameplanet.cam/*
// @match        https://tplay.techplanet.cam/*
// @match        https://eplay2.gameplanet.cam/*
// @match        https://plg7.reviewpalace.net/*
// @match        https://tplay2.techplanet.cam/*
// @match        https://migration.cam/*
// @match        https://m.hegra.cam/*
// @match        https://m.regenzi.site/*
// @match        https://m.monafes.site/*
// @match        https://m.reviewpalace.net/*
// @match        https://m.techland.live/*
// @match        https://forgee.xyz/*
// @match        https://m.forgee.xyz/*
// @match        https://kalosha.site/*
// @match        https://reviewpalace.net/*
// @match        https://jurbana.site/*
// @match        https://hawsa.site/*
// @match        https://gamevault.cam/*
// @match        https://safary.site/*
// @match        https://logenzi.site/*
// @match        https://maftou7.site/*
// @match        https://mar3a.site/*
// @match        https://be7alat.site/*
// @match        https://mastaba.site/*
// @match        https://gamezone.cam/*
// @match        https://robou3.site/*
// @match        https://mar3a.site/*
// @match        https://dl4all.online/*
// @match        https://cheapou.site/*
// @match        https://hegry.site/*
// @match        https://playarena.cam/*
// @match        https://moshakes.site/*
// @match        https://joyarcade.cam/*
// @match        https://gameflare.cam/*
// @match        https://shallal.site/*
// @match        https://marcmello.site/*
// @match        https://mal3oub.site/*
// @match        https://shabory.site/*
// @match        https://marshoush.site/*
// @match        https://ka3boly.site/*
// @match        https://muhager.site/*
// @match        https://ofreok.online/*
// @match        https://ofre15.online/*
// @match        https://a.asd.homes/*
// @match        https://asd.pics/*
// @grant        none
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/527229/Bypass%20ArabSeed.user.js
// @updateURL https://update.greasyfork.org/scripts/527229/Bypass%20ArabSeed.meta.js
// ==/UserScript==

(function () {
  "use strict";

  const SITE_URL = "https://eziothegoat.github.io/dl/";

  const _h = window.location.hostname;
  const _u = () => window.location.href;

  const C = {
    POLL: 2000,
    DEBOUNCE: 500,
    BLOCKED: [
      "videovils.click", "href.li", "aabroishere.website",
      "fulvideozrt.click", "pub-9c4ec7f3f95c448b85e464d2b533aac1.r2.dev",
      "ntryiwl.click",
    ],
    EXTERNAL: [
      "turbobit.net", "up-4ever.net", "frdl.io",
      "filespayouts.com", "bigwarp.io", "nitroflare.com",
    ],
    OFREOK: ["ofreok.online", "ofre15.online"],
    TFS: [
      "hawsa.site", "gamevault.cam", "safary.site", "logenzi.site",
      "maftou7.site", "mar3a.site", "be7alat.site", "mastaba.site",
      "gamezone.cam", "robou3.site", "dl4all.online", "cheapou.site",
      "hegry.site", "playarena.cam", "moshakes.site", "joyarcade.cam",
      "gameflare.cam", "shallal.site", "marcmello.site", "mal3oub.site",
      "shabory.site", "marshoush.site", "ka3boly.site", "muhager.site",
    ],
    DYN_ADS: ["asd.quest", "asd.rest", "asd.show"],
    DOMAIN_CFG: {
      "m.monafes.site": { p: ["t=1", "mon=1"], t: u => !/&t=1&mon=1/.test(u) },
      "m.gamehub.cam": { p: ["mon=1"], t: u => /r=\d+/.test(u) && !/mon=1/.test(u), r: u => u.replace(/(r=\d+)/, "\$1&mon=1") },
      "m.techland.live": { p: ["t=1", "etu=1"], t: u => !/&t=1&etu=1/.test(u) },
      "m.reviewpalace.net": { p: ["t=1", "tuh=1"], t: u => !/&t=1&tuh=1/.test(u) },
      "forgee.xyz": { p: ["mon=1"], t: u => !/&mon=1/.test(u) },
      "m.forgee.xyz": { p: ["mon=1", "monz=1"], t: u => !/&mon=1/.test(u) || !/&monz=1/.test(u) },
      "kalosha.site": { p: ["gmz=1"], t: u => u.includes("game=") && !u.includes("gmz=1") && !u.includes("dgame=") },
      "reviewpalace.net": { p: ["gmz=1"], t: u => /[?&]pst=\d+$/.test(u) && !/&gmz=1/.test(u) },
      "jurbana.site": { p: ["gmz=1"], t: u => /[?&]game=\d+$/.test(u) && !u.includes("gmz=1") },
      "a.asd.homes": {
        p: ["asd4a=1", "asd7b=1", "asd7h=1", "asd7m=1", "asd7n=1", "asd7p=1"],
        t: u => u.includes("/category/downloadz/") && u.includes("r=") && !u.includes("asd4a=1"),
      },
      "asd.pics": {
        p: ["asd8a=1", "asd88b=1", "asd87c=1"],
        t: u => u.includes("/category/downloadz/") && u.includes("r=") && !u.includes("asd8a=1") && !u.includes("asd88b=1") && !u.includes("asd87c=1"),
      },
    },
  };

  const isBlocked = url => C.BLOCKED.some(d => url.includes(d));
  const isExternal = url => C.EXTERNAL.some(d => url.includes(d));
  const go = url => window.location.replace(url);
  const $ = (s, ctx = document) => { try { return ctx.querySelector(s); } catch { return null; } };
  const
$$
= (s, ctx = document) => { try { return Array.from(ctx.querySelectorAll(s)); } catch { return []; } };
  const show = el => { if (!el) return; el.style.display = "block"; el.style.visibility = "visible"; };
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const injectParams = (url, params) => {
    const m = params.filter(p => !url.includes(p));
    return m.length ? url + (url.includes("?") ? "&" : "?") + m.join("&") : url;
  };
  const getDomainCfg = host => Object.entries(C.DOMAIN_CFG).find(([d]) => host.includes(d))?.[1];

  function safeAtob(s) { try { return atob(s); } catch { return null; } }

  function resolveLink(aEl) {
    const href = aEl?.getAttribute("href") || "";
    if (!href.includes("/l/")) return href;
    const b64 = href.split("/l/")[1];
    if (!b64) return href;
    const decoded = safeAtob(b64);
    if (!decoded) return href;
    return decoded.includes("reviewrate.net") ? href : decoded;
  }

  function isDownloadPage() {
    return _h.includes("asd.pics") && _u().includes("/download") && !_u().includes("/category/downloadz/");
  }

  function parseTitle(rawTitle) {
    let t = (rawTitle || "").trim();
    t = t.replace(/[-–—]\s*عرب\s*سيد\s*[-–—]?\s*Arabseed\s*/gi, "")
         .replace(/[-–—]\s*Arabseed\s*/gi, "")
         .replace(/[-–—]\s*عرب\s*سيد\s*/gi, "")
         .replace(/\s*عرب\s*سيد\s*/gi, "")
         .replace(/\s*Arabseed\s*/gi, "")
         .trim();

    const result = { type: null, name: "", season: null, episode: null, lang: null };

    if (/مسلسل/i.test(t)) { result.type = "مسلسل"; t = t.replace(/مسلسل/i, "").trim(); }
    else if (/فيلم/i.test(t)) { result.type = "فيلم"; t = t.replace(/فيلم/i, "").trim(); }
    else if (/برنامج/i.test(t)) { result.type = "برنامج"; t = t.replace(/برنامج/i, "").trim(); }
    else if (/انمي|أنمي/i.test(t)) { result.type = "أنمي"; t = t.replace(/انمي|أنمي/i, "").trim(); }

    if (/مترجم[ةه]?/i.test(t)) { result.lang = "مترجم"; t = t.replace(/مترجم[ةه]?/i, "").trim(); }
    else if (/مدبلج[ةه]?/i.test(t)) { result.lang = "مدبلج"; t = t.replace(/مدبلج[ةه]?/i, "").trim(); }

    const seasonAr = {
      "الاول":1,"الأول":1,"الثاني":2,"الثانى":2,"الثالث":3,"الرابع":4,
      "الخامس":5,"السادس":6,"السابع":7,"الثامن":8,"التاسع":9,"العاشر":10,
      "الحادي عشر":11,"الثاني عشر":12,"الثالث عشر":13,"الرابع عشر":14,"الخامس عشر":15,
    };

    const smAr2 = t.match(/الموسم\s+([\u0600-\u06FF]+\s+[\u0600-\u06FF]+)/i);
    if (smAr2 && seasonAr[smAr2[1].trim()]) {
      result.season = seasonAr[smAr2[1].trim()];
      t = t.replace(smAr2[0], "").trim();
    }
    if (!result.season) {
      const smAr1 = t.match(/الموسم\s+([\u0600-\u06FF]+)/i);
      if (smAr1 && seasonAr[smAr1[1]]) {
        result.season = seasonAr[smAr1[1]];
        t = t.replace(smAr1[0], "").trim();
      }
    }
    if (!result.season) {
      const smEn = t.match(/(?:Season|الموسم)\s+(\d+)/i) || t.match(/S(\d+)/i);
      if (smEn) { result.season = parseInt(smEn[1]); t = t.replace(smEn[0], "").trim(); }
    }

    const emAr = t.match(/الحلقة\s+(\d+)(?:\s+[\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+){0,2})?/i);
    if (emAr) { result.episode = parseInt(emAr[1]); t = t.replace(emAr[0], "").trim(); }
    if (!result.episode) {
      const emEn = t.match(/(?:Episode|E)(\d+)/i);
      if (emEn) { result.episode = parseInt(emEn[1]); t = t.replace(emEn[0], "").trim(); }
    }

    t = t.replace(/[-–—]+/g, " ")
         .replace(/\b(مشاهدة|تحميل|اون\s*لاين|بجودة|عالية|HD|BluRay|WEB[_-]?DL)\b/gi, "")
         .replace(/\s{2,}/g, " ").trim();

    result.name = t || rawTitle;
    return result;
  }

  function fetchDates() {
    const result = { added: null, released: null };

    const timeEl = $("time[datetime], .post-date time, .entry-date, .date, [class*='date'] time");
    if (timeEl) {
      const dt = timeEl.getAttribute("datetime") || timeEl.innerText;
      if (dt) {
        try {
          const d = new Date(dt);
          if (!isNaN(d)) result.added = d.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
        } catch { result.added = dt.trim(); }
      }
    }
    if (!result.added) {
      const meta = $('meta[property="article:published_time"], meta[property="og:updated_time"]');
      if (meta) {
        try {
          const d = new Date(meta.getAttribute("content"));
          if (!isNaN(d)) result.added = d.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
        } catch {}
      }
    }

    const allText = document.body?.innerText || "";
    const ym = allText.match(/(?:سنة الإنتاج|سنة الانتاج|سنة|Year|Release)\s*[:\s]*(\d{4})/i);
    if (ym) result.released = ym[1];

    const ld = $('script[type="application/ld+json"]');
    if (ld) {
      try {
        const data = JSON.parse(ld.textContent);
        if (data.datePublished && !result.added) {
          const d = new Date(data.datePublished);
          if (!isNaN(d)) result.added = d.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
        }
      } catch {}
    }

    return result;
  }

  function scrapeDownloadData() {
    const tabs =
$$
(".tab__inner");
    if (!tabs.length) return null;
    const groups = [];

    tabs.forEach(tab => {
      const quality = tab.getAttribute("data-quality") || "";
      let size = null;
      const sizeEl = tab.querySelector(".downloads__links__filesize span, .file-size, [class*=size]");
      if (sizeEl) size = sizeEl.innerText.trim();
      if (!size) {
        const sm = tab.innerText.match(/(\d+[\.\,]?\d*\s*(?:MB|GB|KB))/i);
        if (sm) size = sm[1];
      }

      const items = tab.querySelectorAll(".downloads__links__list li");
      const links = [];
      items.forEach(li => {
        const a = li.querySelector("a");
        if (!a) return;
        const raw = (li.querySelector("h4")?.innerText || li.innerText || "").trim().split("\n")[0];
        const server = raw.replace(/التحميل الان/g, "").replace(/-/g, "").replace(/\d+p/g, "").trim();
        const url = resolveLink(a);
        links.push({ server, url, isArabSeed: raw.includes("عرب سيد") });
      });
      if (links.length) groups.push({ quality, size, links });
    });

    groups.sort((a, b) => {
      const order = { "1080": 0, "720": 1, "480": 2 };
      return (order[a.quality] ?? 99) - (order[b.quality] ?? 99);
    });

    return groups;
  }

  function redirectToSite(payload) {
    const json = JSON.stringify(payload);
    const encoded = btoa(encodeURIComponent(json));

    const url = SITE_URL + "#" + encoded;
    window.location.href = url;
  }

  function initDownloadPageRedirect() {
    if (!isDownloadPage()) return;

    const tryRedirect = () => {
      const tabs =
$$
(".tab__inner");
      if (!tabs.length) return false;

      const groups = scrapeDownloadData();
      if (!groups || !groups.length) return false;

      const rawTitle = $(".post-title h1, .post-title h2, h1.post-title, .entry-title, h1")?.innerText?.trim() || document.title;
      const parsed = parseTitle(rawTitle);
      const dates = fetchDates();

      const payload = {
        title: parsed.name,
        type: parsed.type,
        season: parsed.season,
        episode: parsed.episode,
        lang: parsed.lang,
        added: dates.added,
        released: dates.released,
        groups: groups,
        source: _u(),
      };

      redirectToSite(payload);
      return true;
    };

    if (tryRedirect()) return;

    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      if (tryRedirect() || attempts > 60) clearInterval(poll);
    }, 200);
  }

  function initAntiInspection() {
    const noop = { init: () => {} };
    try { Object.defineProperty(window, "mdpUnGrabber", { value: {}, writable: false }); } catch {}
    try { Object.defineProperty(window, "UnGrabber", { value: () => noop, writable: false }); } catch {}
    const _open = window.open;
    window.open = function (url, name, feat) {
      try { if (isBlocked(new URL(url, location.href).hostname)) return null; } catch {}
      return _open.call(window, url, name, feat);
    };
  }

  function initURLNormalizer() {
    const btn = $("#btn");
    if (btn && isExternal(btn.href)) return false;
    const url = _u();
    const cfg = getDomainCfg(_h);
    if (cfg?.t(url)) { go(cfg.r ? cfg.r(url) : injectParams(url, cfg.p)); return true; }
    if (C.TFS.includes(_h) && url.includes("r=") && !url.includes("tfs=1")) { go(injectParams(url, ["tfs=1"])); return true; }
    if (/\/category\/.+\?r=\d+$/.test(url)) {
      if (cfg?.t(url)) { go(cfg.r ? cfg.r(url) : injectParams(url, cfg.p)); return true; }
      if (!/&t=1/.test(url)) { go(`${url}&t=1`); return true; }
    }
    return false;
  }

  function initMetaRedirect() {
    const meta = $('meta[http-equiv="Refresh"]');
    if (!meta) return;
    const dest = meta.getAttribute("content")?.split("URL=")[1];
    if (dest) go(dest);
  }

  function initUI() {
    const cd = $("#countdown"); const btn = $("#btn");
    if (cd) cd.style.display = "none";
    if (btn) btn.style.display = "block";
  }

  function initOfreok() {
    if (!C.OFREOK.includes(_h)) return;
    const revealAll = () => {
      [$("#btn"), $('a[href$=".mp4"]'), $('a[href*="/direct/"]')].filter(Boolean).forEach(show);
      ["#countdown", ".modalDialog", "#modal"].forEach(s => $(s)?.remove());
$$
('[style*="display: none"]').forEach(show);
    };
    const disableGuards = () => {
      if (typeof countdown !== "undefined") {
        try { countdown.start = () => {}; countdown.stop = () => {}; if (countdown.container) countdown.container.style.display = "none"; } catch {}
      }
      try { Object.defineProperty(window, "adsbygoogle", { value: [], writable: false }); } catch {}
      MutationObserver.prototype.observe = function () {};
    };
    const handleBtn = () => {
      const real = $("a#btn"); const fakeForm = $("form#btn"); const clickMe = $("div#clickme");
      if (real) show(real);
      if (fakeForm) { fakeForm.style.display = "none"; fakeForm.submit(); }
      if (clickMe) clickMe.style.display = "none";
    };
    new MutationObserver(muts =>
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        if (n.matches?.("#countdown,.modalDialog")) n.remove();
        n.querySelectorAll?.('[style*="display: none"]').forEach(show);
      }))
    ).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
    revealAll(); disableGuards(); handleBtn();
    setInterval(() => { revealAll(); disableGuards(); handleBtn(); }, C.POLL);

$$
("a, button").forEach(el => {
      if (/(download|تحميل)/i.test(el.textContent)) {
        el.addEventListener("click", e => {
          e.preventDefault();
          const link = $('a[href*=".mp4"]')?.href || $("video")?.src;
          if (link) window.location.href = link;
        }, true);
      }
    });
  }

  function initDownloadHandler() {
    if (C.OFREOK.includes(_h)) return;
    const btn = $("a.download-button") || $("button.download-button") || $('a[href*="movie="]') ||
$$
("a, button").find(el => /download/i.test(el.textContent));
    if (!btn) return;
    btn.addEventListener("click", e => {
      e.preventDefault(); e.stopPropagation();
      const src = ($('a[href$=".mp4"]') ||
$$
('a[href*=".mp4"]')[0])?.href || $("video")?.src;
      if (src) window.location.href = src;
    }, true);
  }

  function initAdBlocker() {
    if (!C.DYN_ADS.includes(_h)) return;
    const block = debounce(() =>
$$
("a").forEach(a => { const h = a.getAttribute("href"); if (h && isBlocked(h)) a.removeAttribute("href"); }), C.DEBOUNCE);
    new MutationObserver(muts => { if (muts.some(m => m.type === "childList" || m.type === "attributes")) block(); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
  }

  function initMainPageInterceptor() {
    if (!_h.includes("asd.pics")) return;
    const url = _u();
    if (isDownloadPage()) return;

     if (url.includes("/category/downloadz/") && url.includes("asd8a=1")) {
      let done = false;
      const poll = setInterval(() => {
        const btn = document.querySelector("#btn[href]");
        if (!btn) return;
        const link = btn.getAttribute("href");
        if (!link || link.includes("asd.pics")) return;
        done = true; clearInterval(poll);
        renderFinalDownload(link);
      }, 100);
      setTimeout(() => {
        clearInterval(poll);
        if (!done) renderFinalError();
      }, 10000);
      return;
     }

    if (url.includes("/category/")) return;

    document.addEventListener("click", e => {
      const a = e.target.closest('a[href*="/l/"]');
      if (!a) return;
      e.preventDefault(); e.stopPropagation();
      const b64 = a.getAttribute("href").split("/l/")[1];
      let decoded;
      try { decoded = atob(b64); } catch { return; }
      window.location.href = decoded.includes("reviewrate.net") ? a.getAttribute("href") : decoded;
    }, true);
  }

  function renderFinalDownload(link) {
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const payload = {
      mode: "direct",
      link: link,
      source: _u(),
    };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    window.location.href = SITE_URL + "#" + encoded;
  }

  function renderFinalError() {
    const payload = { mode: "error" };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    window.location.href = SITE_URL + "#" + encoded;
  }

  function boot() {
    initAntiInspection();
    if (initURLNormalizer()) return;
    const run = () => {
      if (isDownloadPage()) { initDownloadPageRedirect(); return; }
      initMetaRedirect();
      initUI();
      initOfreok();
      initMainPageInterceptor();
      initDownloadHandler();
      initAdBlocker();
    };
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", run)
      : run();
  }

  boot();
})();
