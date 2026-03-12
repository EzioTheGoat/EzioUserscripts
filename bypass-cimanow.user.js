// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Violentmonkey Scripts
// @version      3.0.0
// @description  Automatically Bypass all CimaNow Restrictions
// @author       Ezio Auditore
// @icon         https://i.imgur.com/blh1X07.png
// @match        *://cimanow.cc/*
// @match        *://vip.cimanowinc.com/*
// @match        *://bs.cimanow.cc/*
// @match        *://*.cimanow.cc/*
// @match        *://*.cimanowinc.com/*
// @match        *://*.cimanow.online/*
// @match        *://rm.freex2line.online/*
// @match        *://jetload.pp.ua/*
// @require      https://userscripts.adtidy.org/release/adguard-extra/1.0/adguard-extra.user.js
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// ==/UserScript==

(function IIFE() {
  "use strict";

  const hostname = location.hostname;

  // ─────────────────────────────────────────────
  // BRAVE BROWSER MASKING
  // Prevents sites from detecting Brave browser
  // ─────────────────────────────────────────────
  function maskBrave() {
    const braveMock = new Proxy(
      { isBrave: () => Promise.resolve(false) },
      { get: (t, p) => (p in t ? t[p] : () => Promise.resolve()) },
    );

    try {
      delete Navigator.prototype.brave;
    } catch (_) {}
    Object.defineProperty(Navigator.prototype, "brave", {
      get: () => braveMock,
      configurable: true,
      enumerable: false,
    });

    if (navigator.userAgentData) {
      Object.defineProperty(navigator, "userAgentData", {
        value: {
          brands: [
            { brand: "Chromium", version: "120" },
            { brand: "Google Chrome", version: "120" },
            { brand: "Not-A.Brand", version: "99" },
          ],
          mobile: false,
          platform: "Windows",
        },
        configurable: true,
      });
    }
  }

  // ─────────────────────────────────────────────
  // CIMANOW — Block rm.freex2line.online scripts
  // ─────────────────────────────────────────────
  function blockFreex2lineScripts() {
    const BLOCKED_HOST = "rm.freex2line.online";
    const _createElement = Document.prototype.createElement;

    function patchScript(el) {
      const desc = Object.getOwnPropertyDescriptor(
        HTMLScriptElement.prototype,
        "src",
      );
      Object.defineProperty(el, "src", {
        set(url) {
          if (url && url.includes(BLOCKED_HOST)) {
            console.warn("[CimaNow] Blocked script:", url);
            return;
          }
          desc.set.call(el, url);
        },
        get() {
          return desc.get.call(el);
        },
        configurable: true,
      });
    }

    Document.prototype.createElement = function (tag, ...args) {
      const el = _createElement.call(this, tag, ...args);
      if (tag.toLowerCase() === "script") patchScript(el);
      return el;
    };
  }

  // ─────────────────────────────────────────────
  // FREEX2LINE — Auto-click download after countdown
  // ─────────────────────────────────────────────
  function autoClickAfterCountdown() {
    const waitForBtn = setInterval(() => {
      const btn = document.querySelector("#downloadbtn, .downloadbtn");
      if (!btn) return;
      clearInterval(waitForBtn);

      new MutationObserver((_, obs) => {
        if (btn.style.display !== "none" && btn.offsetParent !== null) {
          obs.disconnect();
          setTimeout(() => btn.click(), 300);
        }
      }).observe(btn, { attributes: true, attributeFilter: ["style"] });
    }, 100);
  }

  // ─────────────────────────────────────────────
  // FREEX2LINE — Remove ad anchor elements
  // ─────────────────────────────────────────────
  function removeAdAnchors() {
    ["xqeqjp", "xqeqjp1"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
  }

  // ─────────────────────────────────────────────
  // JETLOAD — Bypass adblock detection
  // Patches offsetParent, getComputedStyle, adsbygoogle, fetch
  // ─────────────────────────────────────────────
  function bypassJetloadDetection() {
    // offsetParent — spoofs null (uBlock-hidden) elements as visible
    const offsetDesc = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetParent",
    );
    Object.defineProperty(HTMLElement.prototype, "offsetParent", {
      get() {
        const val = offsetDesc.get.call(this);
        if (val === null && this.isConnected) {
          return (
            this.parentElement || document.body || document.documentElement
          );
        }
        return val;
      },
      configurable: true,
    });

    // getComputedStyle — only spoofs elements actually hidden by the blocker
    const _getComputedStyle = window.getComputedStyle.bind(window);
    window.getComputedStyle = new Proxy(_getComputedStyle, {
      apply(target, thisArg, args) {
        const style = Reflect.apply(target, thisArg, args);
        const el = args[0];
        const blockerHidden =
          el &&
          el.isConnected &&
          offsetDesc.get.call(el) === null &&
          style.display === "none";
        if (!blockerHidden) return style;
        return new Proxy(style, {
          get(s, prop) {
            if (prop === "display") return "block";
            if (prop === "visibility") return "visible";
            const v = s[prop];
            return typeof v === "function" ? v.bind(s) : v;
          },
        });
      },
    });

    // adsbygoogle.push check
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push = Array.prototype.push;

    // fetch — only intercepts no-cors ad detection requests
    const _fetch = window.fetch.bind(window);
    const fakeFetch = async (input, init) => {
      if (init && init.mode === "no-cors") {
        try {
          return await _fetch(input, init);
        } catch (_) {
          return new Response("", { status: 200 });
        }
      }
      return _fetch(input, init);
    };
    fakeFetch.toString = () => "function fetch() { [native code] }";
    Object.defineProperty(window, "fetch", {
      value: fakeFetch,
      writable: true,
      configurable: true,
    });
  }

  // ─────────────────────────────────────────────
  // JETLOAD — Auto-click download after countdown
  // ─────────────────────────────────────────────
  function autoClickJetload() {
    document.addEventListener("DOMContentLoaded", () => {
      const btn = document.getElementById("downloadbtn");
      if (!btn) return;

      new MutationObserver((_, obs) => {
        const href = btn.getAttribute("href");
        if (
          href &&
          href.startsWith("https://") &&
          btn.classList.contains("visible")
        ) {
          obs.disconnect();
          btn.click();
        }
      }).observe(btn, { attributes: true, attributeFilter: ["href", "class"] });
    });
  }

  // ─────────────────────────────────────────────
  // BOOTSTRAP
  // ─────────────────────────────────────────────
  (function bootstrap() {
    try {
      // Runs on all domains
      maskBrave();

      // CimaNow domains
      if (
        ["cimanow.cc", "cimanowinc.com", "cimanow.online"].some((d) =>
          hostname.includes(d),
        )
      ) {
        blockFreex2lineScripts();
      }

      // freex2line.online
      if (hostname.includes("freex2line.online")) {
        window.addEventListener("DOMContentLoaded", () => {
          removeAdAnchors();
          autoClickAfterCountdown();
          new MutationObserver(removeAdAnchors).observe(document.body, {
            childList: true,
            subtree: true,
          });
        });
      }

      // jetload.pp.ua
      if (hostname.includes("jetload.pp.ua")) {
        bypassJetloadDetection();
        autoClickJetload();
      }
    } catch (err) {
      console.error("[CimaNow] Fatal error:", err);
    }
  })();
})();

