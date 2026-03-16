// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Violentmonkey Scripts
// @version      3.2
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

  function setupNativeSpoof() {
    const _toString = Function.prototype.toString;
    const registry = new WeakMap();

    const spoofedToString = function toString() {
      if (registry.has(this)) return registry.get(this);
      return _toString.call(this);
    };
    registry.set(spoofedToString, "function toString() { [native code] }");

    Object.defineProperty(Function.prototype, "toString", {
      value: spoofedToString,
      writable: true,
      configurable: true,
    });

    return function makeNative(fn, name) {
      registry.set(fn, `function ${name ?? fn.name ?? ""}() { [native code] }`);
      return fn;
    };
  }

  function maskBrave(makeNative) {
    const brands = [
      { brand: "Chromium", version: "120" },
      { brand: "Google Chrome", version: "120" },
      { brand: "Not-A.Brand", version: "99" },
    ];

    try {
      delete Navigator.prototype.brave;
    } catch (_) {}
    Object.defineProperty(Navigator.prototype, "brave", {
      get: makeNative(function () {
        return new Proxy(
          { isBrave: () => Promise.resolve(false) },
          { get: (t, p) => (p in t ? t[p] : () => Promise.resolve()) },
        );
      }, "get brave"),
      configurable: true,
      enumerable: false,
    });

    if (!navigator.userAgentData) return;

    Object.defineProperty(navigator, "userAgentData", {
      value: {
        brands,
        mobile: false,
        platform: "Windows",
        getHighEntropyValues: () =>
          Promise.resolve({
            brands,
            mobile: false,
            platform: "Windows",
            architecture: "x86",
            bitness: "64",
            model: "",
            platformVersion: "15.0.0",
            uaFullVersion: "120.0.0.0",
            fullVersionList: brands,
          }),
        toJSON: () => ({ brands, mobile: false, platform: "Windows" }),
      },
      configurable: true,
    });
  }

  function blockFreex2lineScripts() {
    const BLOCKED_HOST = "rm.freex2line.online";
    const _createElement = Document.prototype.createElement;
    const srcDesc = Object.getOwnPropertyDescriptor(
      HTMLScriptElement.prototype,
      "src",
    );

    Document.prototype.createElement = function (tag, ...args) {
      const el = _createElement.call(this, tag, ...args);
      if (tag.toLowerCase() !== "script") return el;

      Object.defineProperty(el, "src", {
        set(url) {
          if (url?.includes(BLOCKED_HOST)) {
            console.warn("[CimaNow] Blocked freex2line script:", url);
            return;
          }
          srcDesc.set.call(el, url);
        },
        get() {
          return srcDesc.get.call(el);
        },
        configurable: true,
      });

      return el;
    };
  }

  function removeAdAnchors() {
    ["xqeqjp", "xqeqjp1"].forEach((id) =>
      document.getElementById(id)?.remove(),
    );
  }

  function autoClickAfterCountdown() {
    const poll = setInterval(() => {
      const btn = document.querySelector("#downloadbtn, .downloadbtn");
      if (!btn) return;
      clearInterval(poll);

      new MutationObserver((_, obs) => {
        if (btn.style.display === "none" || btn.offsetParent === null) return;
        obs.disconnect();

        setTimeout(() => {
          const href = btn.getAttribute("href") ?? btn.href;
          if (href?.startsWith("http")) {
            window.open(href, "_blank", "noopener");
          } else {
            btn.click();
          }
        }, 300);
      }).observe(btn, { attributes: true, attributeFilter: ["style"] });
    }, 100);
  }

  function bypassJetloadDetection(makeNative) {
    const offsetDesc = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetParent",
    );

    Object.defineProperty(HTMLElement.prototype, "offsetParent", {
      get: makeNative(function () {
        try {
          const val = offsetDesc.get.call(this);
          if (val === null && this.isConnected) {
            return (
              this.parentElement ?? document.body ?? document.documentElement
            );
          }
          return val;
        } catch (_) {
          return null;
        }
      }, "get offsetParent"),
      configurable: true,
    });

    const _getComputedStyle = window.getComputedStyle.bind(window);

    Object.defineProperty(window, "getComputedStyle", {
      value: makeNative(
        new Proxy(_getComputedStyle, {
          apply(target, thisArg, args) {
            try {
              const style = Reflect.apply(target, thisArg, args);
              const el = args[0];
              const blockerHidden =
                el instanceof HTMLElement &&
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
            } catch (_) {
              return Reflect.apply(target, thisArg, args);
            }
          },
        }),
        "getComputedStyle",
      ),
      writable: true,
      configurable: true,
    });

    window.adsbygoogle ??= [];
    window.adsbygoogle.push = Array.prototype.push;

    const _fetch = window.fetch.bind(window);

    Object.defineProperty(window, "fetch", {
      value: makeNative(async function fetch(input, init) {
        if (init?.mode === "no-cors") {
          try {
            return await _fetch(input, init);
          } catch (_) {
            return new Response("", { status: 200 });
          }
        }
        return _fetch(input, init);
      }, "fetch"),
      writable: true,
      configurable: true,
    });
  }

  function autoClickJetload() {
    document.addEventListener("DOMContentLoaded", () => {
      const btn = document.getElementById("downloadbtn");
      if (!btn) return;

      new MutationObserver((_, obs) => {
        const href = btn.getAttribute("href");
        if (href?.startsWith("https://") && btn.classList.contains("visible")) {
          obs.disconnect();
          btn.click();
        }
      }).observe(btn, { attributes: true, attributeFilter: ["href", "class"] });
    });
  }

  (function bootstrap() {
    try {
      const makeNative = setupNativeSpoof();
      //maskBrave(makeNative);

      if (
        ["cimanow.cc", "cimanowinc.com", "cimanow.online"].some((d) =>
          hostname.includes(d),
        )
      ) {
        blockFreex2lineScripts();
      }

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

      if (hostname.includes("jetload.pp.ua")) {
        bypassJetloadDetection(makeNative);
        autoClickJetload();
      }
    } catch (err) {
      console.error("[CimaNow] Fatal bootstrap error:", err);
    }
  })();
})();


