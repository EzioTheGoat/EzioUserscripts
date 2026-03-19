// ==UserScript==
// @name         Bypass ArabSeed
// @name:ar      تخطي عرب سيد
// @namespace    Violentmonkey Scripts
// @version      2.6
// @description  Automatically bypass the countdown and show the download link
// @description:ar هذا السكربت مخصص لتحسين تجربتك على موقع عرب سيد من خلال تجاوز العراقيل المختلفة مثل مؤقت العد التنازلي، النوافذ المنبثقة، التحويلات المزيفة، وفتح صفحة التحميل مباشرةً. استمتع بتجربة مشاهدة سلسة دون انقطاع!
// @author       Ezio Auditore
// @license      MIT
// @icon         https://i.imgur.com/purcqbc.png
// @match        https://m.gameshop4u.com/*
// @match        https://m.gamehub.cam/*
// @match        https://adding.quest/*
// @match        https://zplay.gamezone.cam/*
// @match        https://gamestation.cam/*
// @match        https://gplay.gameplanet.cam/*
// @match        https://tplay.techplanet.cam/*
// @match        https://eplay2.gameplanet.cam/*
// @match        https://plg7.reviewpalace.net/*
// @match        https://tplay2.techplanet.cam/*
// @match        https://migration.cam/*
// @match        https://m.hegra.cam/*
// @match        https://m.regenzi.site/*
// @match        https://m.monafes.site/*
// @match        https://m.reviewpalace.net/*
// @match        https://m.techland.live/*
// @match        https://forgee.xyz/*
// @match        https://m.forgee.xyz/*
// @match        https://kalosha.site/*
// @match        https://reviewpalace.net/*
// @match        https://jurbana.site/*
// @match        https://hawsa.site/*
// @match        https://gamevault.cam/*
// @match        https://safary.site/*
// @match        https://logenzi.site/*
// @match        https://maftou7.site/*
// @match        https://mar3a.site/*
// @match        https://be7alat.site/*
// @match        https://mastaba.site/*
// @match        https://gamezone.cam/*
// @match        https://robou3.site/*
// @match        https://mar3a.site/*
// @match        https://dl4all.online/*
// @match        https://cheapou.site/*
// @match        https://hegry.site/*
// @match        https://playarena.cam/*
// @match        https://moshakes.site/*
// @match        https://joyarcade.cam/*
// @match        https://gameflare.cam/*
// @match        https://shallal.site/*
// @match        https://marcmello.site/*
// @match        https://mal3oub.site/*
// @match        https://shabory.site/*
// @match        https://marshoush.site/*
// @match        https://ka3boly.site/*
// @match        https://muhager.site/*
// @match        https://ofreok.online/*
// @match        https://ofre15.online/*
// @match        https://a.asd.homes/*
// @match        https://asd.pics/*
// @grant        none
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/527229/Bypass%20ArabSeed.user.js
// @updateURL https://update.greasyfork.org/scripts/527229/Bypass%20ArabSeed.meta.js
// ==/UserScript==

(function () {
  "use strict";

  const _h = window.location.hostname;
  const _u = () => window.location.href;

  const C = {
    POLL: 2000,
    DEBOUNCE: 500,
    BLOCKED: [
      "videovils.click",
      "href.li",
      "aabroishere.website",
      "fulvideozrt.click",
      "pub-9c4ec7f3f95c448b85e464d2b533aac1.r2.dev",
      "ntryiwl.click",
    ],
    EXTERNAL: [
      "turbobit.net",
      "up-4ever.net",
      "frdl.io",
      "filespayouts.com",
      "bigwarp.io",
      "nitroflare.com",
    ],
    OFREOK: ["ofreok.online", "ofre15.online"],
    TFS: [
      "hawsa.site",
      "gamevault.cam",
      "safary.site",
      "logenzi.site",
      "maftou7.site",
      "mar3a.site",
      "be7alat.site",
      "mastaba.site",
      "gamezone.cam",
      "robou3.site",
      "dl4all.online",
      "cheapou.site",
      "hegry.site",
      "playarena.cam",
      "moshakes.site",
      "joyarcade.cam",
      "gameflare.cam",
      "shallal.site",
      "marcmello.site",
      "mal3oub.site",
      "shabory.site",
      "marshoush.site",
      "ka3boly.site",
      "muhager.site",
    ],
    DYN_ADS: ["asd.quest", "asd.rest", "asd.show"],
    DOMAIN_CFG: {
      "m.monafes.site": {
        p: ["t=1", "mon=1"],
        t: (u) => !/&t=1&mon=1/.test(u),
      },
      "m.gamehub.cam": {
        p: ["mon=1"],
        t: (u) => /r=\d+/.test(u) && !/mon=1/.test(u),
        r: (u) => u.replace(/(r=\d+)/, "$1&mon=1"),
      },
      "m.techland.live": {
        p: ["t=1", "etu=1"],
        t: (u) => !/&t=1&etu=1/.test(u),
      },
      "m.reviewpalace.net": {
        p: ["t=1", "tuh=1"],
        t: (u) => !/&t=1&tuh=1/.test(u),
      },
      "forgee.xyz": { p: ["mon=1"], t: (u) => !/&mon=1/.test(u) },
      "m.forgee.xyz": {
        p: ["mon=1", "monz=1"],
        t: (u) => !/&mon=1/.test(u) || !/&monz=1/.test(u),
      },
      "kalosha.site": {
        p: ["gmz=1"],
        t: (u) =>
          u.includes("game=") && !u.includes("gmz=1") && !u.includes("dgame="),
      },
      "reviewpalace.net": {
        p: ["gmz=1"],
        t: (u) => /[?&]pst=\d+$/.test(u) && !/&gmz=1/.test(u),
      },
      "jurbana.site": {
        p: ["gmz=1"],
        t: (u) => /[?&]game=\d+$/.test(u) && !u.includes("gmz=1"),
      },
      "a.asd.homes": {
        p: ["asd4a=1", "asd7b=1", "asd7h=1", "asd7m=1", "asd7n=1", "asd7p=1"],
        t: (u) =>
          u.includes("/category/downloadz/") &&
          u.includes("r=") &&
          !u.includes("asd4a=1"),
      },
      "asd.pics": {
        p: ["asd8a=1", "asd88b=1"],
        t: (u) =>
          u.includes("/category/downloadz/") &&
          u.includes("r=") &&
          !u.includes("asd8a=1") &&
          !u.includes("asd88b=1"),
      },
    },
  };

  const isBlocked = (url) => C.BLOCKED.some((d) => url.includes(d));
  const isExternal = (url) => C.EXTERNAL.some((d) => url.includes(d));
  const go = (url) => window.location.replace(url);
  const $ = (s, ctx = document) => {
    try {
      return ctx.querySelector(s);
    } catch {
      return null;
    }
  };
  const $$ = (s, ctx = document) => {
    try {
      return Array.from(ctx.querySelectorAll(s));
    } catch {
      return [];
    }
  };
  const show = (el) => {
    if (!el) return;
    el.style.display = "block";
    el.style.visibility = "visible";
  };
  const debounce = (fn, ms) => {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), ms);
    };
  };

  const injectParams = (url, params) => {
    const missing = params.filter((p) => !url.includes(p));
    return missing.length
      ? url + (url.includes("?") ? "&" : "?") + missing.join("&")
      : url;
  };

  const getDomainCfg = (host) =>
    Object.entries(C.DOMAIN_CFG).find(([d]) => host.includes(d))?.[1];

  function initAntiInspection() {
    const noop = { init: () => {} };
    try {
      Object.defineProperty(window, "mdpUnGrabber", {
        value: {},
        writable: false,
      });
    } catch {}
    try {
      Object.defineProperty(window, "UnGrabber", {
        value: () => noop,
        writable: false,
      });
    } catch {}
    const _open = window.open;
    window.open = function (url, name, feat) {
      try {
        if (isBlocked(new URL(url, location.href).hostname)) return null;
      } catch {}
      return _open.call(window, url, name, feat);
    };
  }

  function initURLNormalizer() {
    const btn = $("#btn");
    if (btn && isExternal(btn.href)) return false;

    const url = _u();
    const cfg = getDomainCfg(_h);

    if (cfg?.t(url)) {
      go(cfg.r ? cfg.r(url) : injectParams(url, cfg.p));
      return true;
    }

    if (C.TFS.includes(_h) && url.includes("r=") && !url.includes("tfs=1")) {
      go(injectParams(url, ["tfs=1"]));
      return true;
    }

    if (/\/category\/.+\?r=\d+$/.test(url)) {
      if (cfg?.t(url)) {
        go(cfg.r ? cfg.r(url) : injectParams(url, cfg.p));
        return true;
      }
      if (!/&t=1/.test(url)) {
        go(`${url}&t=1`);
        return true;
      }
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
    const cd = $("#countdown");
    const btn = $("#btn");
    if (cd) cd.style.display = "none";
    if (btn) btn.style.display = "block";
  }

  function initOfreok() {
    if (!C.OFREOK.includes(_h)) return;

    const revealAll = () => {
      [$("#btn"), $('a[href$=".mp4"]'), $('a[href*="/direct/"]')]
        .filter(Boolean)
        .forEach(show);
      ["#countdown", ".modalDialog", "#modal"].forEach((s) => $(s)?.remove());
      $$('[style*="display: none"]').forEach(show);
    };

    const disableGuards = () => {
      if (typeof countdown !== "undefined") {
        try {
          countdown.start = () => {};
          countdown.stop = () => {};
          if (countdown.container) countdown.container.style.display = "none";
        } catch {}
      }
      try {
        Object.defineProperty(window, "adsbygoogle", {
          value: [],
          writable: false,
        });
      } catch {}
      MutationObserver.prototype.observe = function () {};
    };

    const handleBtn = () => {
      const real = $("a#btn");
      const fakeForm = $("form#btn");
      const clickMe = $("div#clickme");
      if (real) show(real);
      if (fakeForm) {
        fakeForm.style.display = "none";
        fakeForm.submit();
      }
      if (clickMe) clickMe.style.display = "none";
    };

    new MutationObserver((muts) =>
      muts.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          if (n.matches?.("#countdown,.modalDialog")) n.remove();
          n.querySelectorAll?.('[style*="display: none"]').forEach(show);
        }),
      ),
    ).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });

    revealAll();
    disableGuards();
    handleBtn();
    setInterval(() => {
      revealAll();
      disableGuards();
      handleBtn();
    }, C.POLL);

    $$("a, button").forEach((el) => {
      if (/(download|تحميل)/i.test(el.textContent)) {
        el.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const link = $('a[href*=".mp4"]')?.href || $("video")?.src;
            if (link) window.location.href = link;
          },
          true,
        );
      }
    });
  }

  function initDownloadHandler() {
    if (C.OFREOK.includes(_h)) return;
    const btn =
      $("a.download-button") ||
      $("button.download-button") ||
      $('a[href*="movie="]') ||
      $$("a, button").find((el) => /download/i.test(el.textContent));
    if (!btn) return;
    btn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        const src =
          ($('a[href$=".mp4"]') || $$('a[href*=".mp4"]')[0])?.href ||
          $("video")?.src;
        if (src) window.location.href = src;
      },
      true,
    );
  }

  function initAdBlocker() {
    if (!C.DYN_ADS.includes(_h)) return;
    const block = debounce(
      () =>
        $$("a").forEach((a) => {
          const h = a.getAttribute("href");
          if (h && isBlocked(h)) a.removeAttribute("href");
        }),
      C.DEBOUNCE,
    );
    new MutationObserver((muts) => {
      if (muts.some((m) => m.type === "childList" || m.type === "attributes"))
        block();
    }).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });
  }

  function initMainPageInterceptor() {
    if (!_h.includes("asd.pics")) return;
    const url = _u();

    if (url.includes("/category/downloadz/") && url.includes("asd8a=1")) {
      let done = false;
      const poll = setInterval(() => {
        const btn = document.querySelector("#btn[href]");
        if (!btn) return;
        const link = btn.getAttribute("href");
        if (!link || link.includes("asd.pics")) return;
        done = true;
        clearInterval(poll);
        renderDownloadUI(link);
      }, 100);
      setTimeout(() => {
        clearInterval(poll);
        if (!done) renderErrorUI();
      }, 10000);
      return;
    }

    if (url.includes("/category/")) return;

    document.addEventListener(
      "click",
      (e) => {
        const a = e.target.closest('a[href*="/l/"]');
        if (!a) return;
        e.preventDefault();
        e.stopPropagation();
        const b64 = a.getAttribute("href").split("/l/")[1];
        let decoded;
        try {
          decoded = atob(b64);
        } catch {
          return;
        }
        window.location.href = decoded.includes("reviewrate.net")
          ? a.getAttribute("href")
          : decoded;
      },
      true,
    );
  }

  function renderDownloadUI(link) {
    document.getElementById("ezio-overlay")?.remove();
    const el = document.createElement("div");
    el.id = "ezio-overlay";
    el.setAttribute(
      "style",
      "position:fixed!important;top:0!important;left:0!important;width:100%!important;height:100%!important;background:#0d1117!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;z-index:2147483647!important;font-family:Arial,sans-serif!important;margin:0!important;padding:0!important",
    );
    el.innerHTML = `<div style="text-align:center!important;padding:40px!important;background:#1c2333!important;border-radius:16px!important;border:2px solid #4FA083!important;max-width:500px!important;width:90%!important;box-shadow:0 0 40px rgba(79,160,131,0.3)!important;font-family:Arial,sans-serif!important"><img src="https://i.ibb.co/zWChc0Z9/q.png" style="width:400px!important;height:400px!important;object-fit:contain!important;display:block!important;margin:0 auto 20px auto!important"/><h2 style="color:#4FA083!important;margin:0 0 10px 0!important;font-size:22px!important;font-family:Arial,sans-serif!important;font-weight:bold!important">تم تحضير رابط التحميل</h2><p style="color:#aaa!important;font-size:14px!important;margin:0 0 25px 0!important;font-family:Arial,sans-serif!important">تم إعداد الرابط بواسطة <span style="font-weight:bold!important;background:linear-gradient(90deg,#4FA083,#7fffd4,#4FA083)!important;-webkit-background-clip:text!important;-webkit-text-fill-color:transparent!important;background-clip:text!important;font-size:15px!important">Ezio Auditore</span></p><p style="color:#aaa!important;font-size:15px!important;margin:0 0 15px 0!important;font-family:Arial,sans-serif!important">سيبدأ التحميل تلقائياً، إذا لم يبدأ اضغط الزر أدناه</p><a href="${link}" download target="_blank" style="display:block!important;background:#4FA083!important;color:white!important;padding:14px 28px!important;border-radius:8px!important;text-decoration:none!important;font-size:17px!important;font-family:Arial,sans-serif!important;font-weight:bold!important">⬇️ تحميل الملف</a></div>`;
    document.body.appendChild(el);
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = link;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.close(), 2000);
    }, 800);
  }

  function renderErrorUI() {
    document.getElementById("ezio-overlay")?.remove();
    const el = document.createElement("div");
    el.id = "ezio-overlay";
    el.setAttribute(
      "style",
      "position:fixed!important;top:0!important;left:0!important;width:100%!important;height:100%!important;background:#0d1117!important;display:flex!important;align-items:center!important;justify-content:center!important;z-index:2147483647!important;font-family:Arial,sans-serif!important",
    );
    el.innerHTML = `<div style="text-align:center!important;padding:40px!important;background:#1c2333!important;border-radius:16px!important;border:2px solid #ff4444!important;max-width:500px!important;width:90%!important;font-family:Arial,sans-serif!important"><img src="https://i.ibb.co/zWChc0Z9/q.png" style="width:80px!important;height:80px!important;object-fit:contain!important;margin:0 auto 20px!important;display:block!important"/><h2 style="color:#ff4444!important;margin:0 0 10px 0!important;font-size:22px!important;font-family:Arial,sans-serif!important">فشل استخراج الرابط</h2><p style="color:#aaa!important;font-size:14px!important;margin:0 0 20px 0!important;font-family:Arial,sans-serif!important">يرجى المحاولة مرة أخرى</p><button onclick="window.close()" style="background:#ff4444!important;color:white!important;border:none!important;padding:12px 24px!important;border-radius:8px!important;font-size:16px!important;cursor:pointer!important;font-family:Arial,sans-serif!important">إغلاق</button></div>`;
    document.body.appendChild(el);
  }

  function boot() {
    initAntiInspection();
    if (initURLNormalizer()) return;
    const run = () => {
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

