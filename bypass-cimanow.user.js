// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Violentmonkey Scripts
// @version      3.4
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

  function maskBrave() {
    try {
      delete Navigator.prototype.brave;
    } catch (_) {}
    Object.defineProperty(Navigator.prototype, "brave", {
      get() {
        return { isBrave: () => Promise.resolve(false) };
      },
      configurable: true,
      enumerable: false,
    });

    if (!navigator.userAgentData) return;

    const brands = [
      { brand: "Chromium", version: "120" },
      { brand: "Google Chrome", version: "120" },
      { brand: "Not-A.Brand", version: "99" },
    ];
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

    function checkAndBlock(node) {
      if (!(node instanceof HTMLScriptElement)) return;
      const src = node.getAttribute("src") || node.src;
      if (src?.includes(BLOCKED_HOST)) {
        node.type = "blocked/javascript";
        node.removeAttribute("src");
        console.warn("[CimaNow] Blocked freex2line script:", src);
      }
    }

    const _appendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function (child) {
      try {
        checkAndBlock(child);
      } catch (_) {}
      return _appendChild.call(this, child);
    };

    const _insertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, refNode) {
      try {
        checkAndBlock(newNode);
      } catch (_) {}
      return _insertBefore.call(this, newNode, refNode);
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

  function makeNative(fn, name) {
    const nativeStr = `function ${name ?? fn.name ?? ""}() { [native code] }`;
    const toStr = function toString() {
      return nativeStr;
    };
    Object.defineProperty(toStr, "toString", {
      value: function toString() {
        return "function toString() { [native code] }";
      },
      configurable: true,
      writable: true,
    });
    Object.defineProperty(fn, "toString", {
      value: toStr,
      configurable: true,
      writable: true,
    });
    return fn;
  }

  function bypassJetloadDetection() {
    let offsetDesc = null;
    let proto = HTMLElement.prototype;
    while (proto) {
      offsetDesc = Object.getOwnPropertyDescriptor(proto, "offsetParent");
      if (offsetDesc) break;
      proto = Object.getPrototypeOf(proto);
    }

    if (offsetDesc?.get) {
      const originalGetter = offsetDesc.get;

      const getter = makeNative(function () {
        try {
          const val = originalGetter.call(this);
          if (val === null && this.isConnected) {
            if (
              this.style.display === "none" ||
              this.style.visibility === "hidden"
            ) {
              return null;
            }
            return (
              this.parentElement ?? document.body ?? document.documentElement
            );
          }
          return val;
        } catch (_) {
          return null;
        }
      }, "get offsetParent");

      Object.defineProperty(HTMLElement.prototype, "offsetParent", {
        get: getter,
        configurable: true,
      });
    }

    const _getComputedStyle = window.getComputedStyle.bind(window);

    Object.defineProperty(window, "getComputedStyle", {
      value: makeNative(
        new Proxy(_getComputedStyle, {
          apply(target, thisArg, args) {
            try {
              const style = Reflect.apply(target, thisArg, args);
              const el = args[0];

              if (
                el instanceof HTMLElement &&
                (el.style.display === "none" ||
                  el.style.visibility === "hidden")
              ) {
                return style;
              }

              const blockerHidden =
                el instanceof HTMLElement &&
                el.isConnected &&
                offsetDesc?.get?.call(el) === null &&
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
      // if (
      //   ["cimanow.cc", "cimanowinc.com", "cimanow.online"].some((d) =>
      //     hostname.includes(d),
      //   )
      // ) {
      //   blockFreex2lineScripts();
      // }

      if (hostname.includes("freex2line.online")) {
        window.addEventListener("DOMContentLoaded", () => {
          // removeAdAnchors();
          autoClickAfterCountdown();
          // new MutationObserver(removeAdAnchors).observe(document.body, {
          //   childList: true,
          //   subtree: true,
          // });
        });
      }

      if (hostname.includes("jetload.pp.ua")) {
        maskBrave();
        bypassJetloadDetection();
        autoClickJetload();
      }
    } catch (err) {
      console.error("[CimaNow] Fatal bootstrap error:", err);
    }
  })();
})();


