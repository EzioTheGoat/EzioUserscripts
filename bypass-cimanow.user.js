// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Ezio Scripts
// @version      4.0
// @description  This script enhances your experience by blocking popups, preventing fake redirects, and blocking intrusive advertisements for a seamless streaming experience.
// @author       Ezio Auditore
// @icon         https://i.ibb.co/zVkV324z/Ezio.png
// @match        *://*.cimanow.cc/*
// @match        *://*.cimanowinc.com/*
// @match        *://*.cimanow.online/*
// @match        *://*.upns.online/*
// @match        *://*.freex2line.online/*
// @match        *://*.pp.ua/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// ==/UserScript==

(function IIFE() {
  "use strict";

  const host = location.hostname;

  const matchDomain = (domain) =>
    host === domain || host.endsWith("." + domain);

  function _mn(fn, name) {
    const body = `function ${name ?? fn.name ?? ""}() { [native code] }`;
    const t = function toString() {
      return body;
    };
    try {
      Object.defineProperty(t, "toString", {
        value: function toString() {
          return "function toString() { [native code] }";
        },
        configurable: true,
        writable: true,
      });
      Object.defineProperty(fn, "toString", {
        value: t,
        configurable: true,
        writable: true,
      });
    } catch (_) {}
    return fn;
  }

  function _pih() {
    try {
      const d = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
      if (!d) return;
      Object.defineProperty(Element.prototype, "innerHTML", {
        set(v) {
          try {
            if (
              (this === document.body || this === document.documentElement) &&
              (v === "" || v === null)
            )
              return;
            return d.set.call(this, v);
          } catch (e) {
            return d.set.call(this, v);
          }
        },
        get() {
          return d.get.call(this);
        },
        configurable: true,
      });
    } catch (_) {}
  }

  function _bima() {
    class _Noop {
      addEventListener() {}
      removeEventListener() {}
    }
    class AdDisplayContainer extends _Noop {
      initialize() {}
      destroy() {}
    }
    class AdsLoader extends _Noop {
      requestAds() {}
      destroy() {}
      getSettings() {
        return {};
      }
    }
    class AdsManager extends _Noop {
      init() {}
      start() {}
      destroy() {}
      stop() {}
      pause() {}
      resume() {}
      getVolume() {
        return 1;
      }
      setVolume() {}
      getRemainingTime() {
        return 0;
      }
      getCuePoints() {
        return [];
      }
    }
    class AdsRequest {
      setAdWillAutoPlay() {}
      setAdWillPlayMuted() {}
    }

    window.google = window.google || {};
    window.google.ima = {
      AdDisplayContainer,
      AdsLoader,
      AdsManager,
      AdsRequest,
      AdsManagerLoadedEvent: {
        Type: { ADS_MANAGER_LOADED: "adsManagerLoaded" },
      },
      AdErrorEvent: { Type: { AD_ERROR: "adError" } },
      AdEvent: {
        Type: {
          COMPLETE: "complete",
          ALL_ADS_COMPLETED: "allAdsCompleted",
          STARTED: "started",
          PAUSED: "paused",
          RESUMED: "resumed",
          SKIPPED: "skipped",
          SKIPPABLE_STATE_CHANGED: "skippableStateChanged",
        },
      },
      ViewMode: { NORMAL: "normal", FULLSCREEN: "fullscreen" },
      UiElements: { AD_ATTRIBUTION: "adAttribution", COUNTDOWN: "countdown" },
    };

    const _ce = document.createElement.bind(document);
    const _src = Object.getOwnPropertyDescriptor(
      HTMLScriptElement.prototype,
      "src",
    );
    let _patched = true;

    document.createElement = function (tag) {
      const el = _ce(tag);
      try {
        if (_patched && tag.toLowerCase() === "script" && _src) {
          Object.defineProperty(el, "src", {
            set(val) {
              try {
                if (/imasdk\.googleapis\.com/i.test(val)) {
                  _patched = false;
                  document.createElement = _ce.bind(document);
                  setTimeout(() => el.dispatchEvent(new Event("load")), 50);
                  return;
                }
              } catch (_) {}
              _src.set.call(el, val);
            },
            get() {
              return _src.get.call(el);
            },
          });
        }
      } catch (_) {}
      return el;
    };
  }

  function _mb() {
    ["get", "delete", "defineProperty"].forEach((op) => {
      try {
        if (op === "get")
          Object.defineProperty(Navigator.prototype, "brave", {
            get: undefined,
            configurable: true,
          });
        else if (op === "delete") delete Navigator.prototype.brave;
        else
          Object.defineProperty(Navigator.prototype, "brave", {
            value: undefined,
            writable: true,
            configurable: true,
            enumerable: false,
          });
      } catch (_) {}
    });
  }

  function _bjd() {
    let _od = null,
      _p = HTMLElement.prototype;
    while (_p) {
      _od = Object.getOwnPropertyDescriptor(_p, "offsetParent");
      if (_od) break;
      _p = Object.getPrototypeOf(_p);
    }
    if (_od?.get) {
      const _og = _od.get;
      Object.defineProperty(HTMLElement.prototype, "offsetParent", {
        get: _mn(function () {
          try {
            const v = _og.call(this);
            if (v === null && this.isConnected) {
              if (
                this.style.display === "none" ||
                this.style.visibility === "hidden"
              )
                return null;
              return (
                this.parentElement ?? document.body ?? document.documentElement
              );
            }
            return v;
          } catch (_) {
            return null;
          }
        }, "get offsetParent"),
        configurable: true,
      });
    }

    const _gcs = window.getComputedStyle.bind(window);
    try {
      Object.defineProperty(window, "getComputedStyle", {
        value: _mn(
          new Proxy(_gcs, {
            apply(target, thisArg, args) {
              try {
                const st = Reflect.apply(target, thisArg, args);
                const el = args[0];
                if (
                  el instanceof HTMLElement &&
                  (el.style.display === "none" ||
                    el.style.visibility === "hidden")
                )
                  return st;
                const bh =
                  el instanceof HTMLElement &&
                  el.isConnected &&
                  _od?.get?.call(el) === null &&
                  st.display === "none";
                if (!bh) return st;
                return new Proxy(st, {
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
    } catch (_) {}

    try {
      Object.defineProperty(window, "adsbygoogle", {
        value: { loaded: true, push: Array.prototype.push, length: 0 },
        configurable: true,
        writable: true,
      });
    } catch (_) {
      window.adsbygoogle = {
        loaded: true,
        push: Array.prototype.push,
        length: 0,
      };
    }

    const _gt = {
      cmd: {
        push(fn) {
          try {
            fn();
          } catch (_) {}
        },
      },
      pubads: () => ({
        enableSingleRequest: () => {},
        collapseEmptyDivs: () => {},
        setTargeting: () => _gt.pubads(),
        addEventListener: () => {},
        refresh: () => {},
        disableInitialLoad: () => {},
        enableAsyncRendering: () => {},
      }),
      enableServices: () => {},
      defineSlot: () => ({
        addService: () => _gt.defineSlot(),
        setTargeting: () => _gt.defineSlot(),
      }),
      display: () => {},
      destroySlots: () => {},
      apiReady: true,
      pubadsReady: true,
    };
    try {
      Object.defineProperty(window, "googletag", {
        value: _gt,
        configurable: true,
        writable: true,
      });
    } catch (_) {
      window.googletag = _gt;
    }

    const _AD =
      /doubleclick|googlesyndication|adservice|amazon-adsystem|pagead|adsbygoogle|googletagmanager|googletagservices/;
    const _f = window.fetch.bind(window);
    try {
      Object.defineProperty(window, "fetch", {
        value: _mn(async function fetch(input, init) {
          const url = typeof input === "string" ? input : (input?.url ?? "");
          if (_AD.test(url)) {
            try {
              return await _f(input, init);
            } catch (_) {
              return new Response("", { status: 200 });
            }
          }
          return _f(input, init);
        }, "fetch"),
        writable: true,
        configurable: true,
      });
    } catch (_) {}
  }

  function _rfx() {
    window.zJSYdQ = true;

    const _mo = new MutationObserver((mutations) => {
      for (const m of mutations)
        for (const node of m.addedNodes)
          if (
            node.nodeType === 1 &&
            node.tagName === "SCRIPT" &&
            node.textContent.includes("throw new Error()")
          )
            node.textContent = node.textContent.replace(
              /throw new Error\(\);/g,
              "",
            );
    });

    _mo.observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener("DOMContentLoaded", () => _mo.disconnect(), {
      once: true,
    });

    const _si = window.setInterval.bind(window);
    Object.defineProperty(window, "setInterval", {
      value: _mn(function setInterval(fn, delay, ...args) {
        try {
          const src = typeof fn === "function" ? fn.toString() : String(fn);
          if (src.includes("=Date[") || src.includes("Date["))
            return _si(() => {}, delay);
        } catch (_) {}
        return _si(fn, delay, ...args);
      }, "setInterval"),
      writable: true,
      configurable: true,
    });

    const _ral = () =>
      document
        .querySelectorAll("main > section[aria-label]")
        .forEach((el) => el.removeAttribute("aria-label"));
    document.addEventListener("DOMContentLoaded", _ral, { once: true });
    setTimeout(_ral, 500);
    setTimeout(_ral, 1500);
  }

  const routes = [
    {
      domain: "cimanow.cc",
      fn: () => {
        _pih();
        _mb();
      },
    },
    {
      domain: "upns.online",
      fn: () => {
        _bima();
      },
    },
    {
      domain: "freex2line.online",
      fn: () => {
        if (!sessionStorage.getItem("_bypassed")) {
          sessionStorage.setItem("_bypassed", "1");
          location.reload();
          return;
        }
        sessionStorage.removeItem("_bypassed");
        _rfx();
        _bjd();
      },
    },
    {
      domain: "jetload.pp.ua",
      fn: () => {
        _pih();
        _mb();
        _bjd();
      },
    },
  ];

  (function routeRunner() {
    try {
      routes.forEach((r) => {
        try {
          if (matchDomain(r.domain)) r.fn();
        } catch (_) {}
      });
    } catch (e) {
      console.error("[bypass-cimanow] error:", e);
    }
  })();
})();

