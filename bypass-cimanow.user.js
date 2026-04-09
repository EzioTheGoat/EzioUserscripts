// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Ezio Scripts
// @version      5.5
// @description  This script enhances your experience by blocking popups, preventing fake redirects, and blocking intrusive advertisements for a seamless streaming experience.
// @author       Ezio Auditore
// @icon         https://i.ibb.co/zVkV324z/Ezio.png
// @match        *://*.cimanow.cc/*
// @match        *://*.cimanowinc.com/*
// @match        *://*.cimanow.online/*
// @match        *://*.upns.online/*
// @match        *://*.freex2line.online/*
// @match        *://*.pp.ua/*

// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// ==/UserScript==

(function IIFE() {
  "use strict";
  var _isFF = /Firefox/.test(navigator.userAgent);
  var _$ = [
    "\x42\x72\x61\x76\x65",
    "\x43\x68\x72\x6f\x6d\x65",
    "\x75\x73\x65\x72\x41\x67\x65\x6e\x74",
    "\x76\x65\x6e\x64\x6f\x72",
    "\x47\x6f\x6f\x67\x6c\x65\x20\x49\x6e\x63\x2e",
    "\x70\x6c\x61\x74\x66\x6f\x72\x6d",
    "\x57\x69\x6e\x33\x32",
    "\x75\x73\x65\x72\x41\x67\x65\x6e\x74\x44\x61\x74\x61",
    "\x43\x68\x72\x6f\x6d\x69\x75\x6d",
    "\x47\x6f\x6f\x67\x6c\x65\x20\x43\x68\x72\x6f\x6d\x65",
    "\x57\x69\x6e\x64\x6f\x77\x73",
    "\x78\x38\x36",
    "\x36\x34",
    "\x31\x32\x32\x2e\x30\x2e\x30\x2e\x30",
    "\x31\x32\x32",
    "\x62\x72\x61\x76\x65",
    "\x69\x6e\x6e\x65\x72\x48\x54\x4d\x4c",
    "\x6f\x66\x66\x73\x65\x74\x50\x61\x72\x65\x6e\x74",
    "\x6f\x66\x66\x73\x65\x74\x48\x65\x69\x67\x68\x74",
    "\x6f\x66\x66\x73\x65\x74\x57\x69\x64\x74\x68",
    "\x67\x65\x74\x42\x6f\x75\x6e\x64\x69\x6e\x67\x43\x6c\x69\x65\x6e\x74\x52\x65\x63\x74",
    "\x67\x65\x74\x43\x6f\x6d\x70\x75\x74\x65\x64\x53\x74\x79\x6c\x65",
    "\x61\x64\x73\x62\x79\x67\x6f\x6f\x67\x6c\x65",
    "\x67\x6f\x6f\x67\x6c\x65\x74\x61\x67",
    "\x66\x65\x74\x63\x68",
    "\x69\x6d\x61\x73\x64\x6b\x2e\x67\x6f\x6f\x67\x6c\x65\x61\x70\x69\x73\x2e\x63\x6f\x6d",
    "\x78\x71\x65\x71\x6a\x70",
    "\x78\x71\x65\x71\x6a\x70\x31",
    "\x63\x69\x6d\x61\x6e\x6f\x77\x2e\x63\x63",
    "\x63\x69\x6d\x61\x6e\x6f\x77\x69\x6e\x63\x2e\x63\x6f\x6d",
    "\x75\x70\x6e\x73\x2e\x6f\x6e\x6c\x69\x6e\x65",
    "\x66\x72\x65\x65\x78\x32\x6c\x69\x6e\x65\x2e\x6f\x6e\x6c\x69\x6e\x65",
    "\x6a\x65\x74\x6c\x6f\x61\x64\x2e\x70\x70\x2e\x75\x61",
    "\x64\x69\x73\x70\x6c\x61\x79",
    "\x76\x69\x73\x69\x62\x69\x6c\x69\x74\x79",
    "\x6e\x6f\x6e\x65",
    "\x68\x69\x64\x64\x65\x6e",
    "\x62\x6c\x6f\x63\x6b",
    "\x76\x69\x73\x69\x62\x6c\x65",
    "\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64",
    "\x5b\x62\x79\x70\x61\x73\x73\x2d\x63\x69\x6d\x61\x6e\x6f\x77\x5d\x20\x65\x72\x72\x6f\x72\x3a",
    "\x73\x72\x63",
    "\x73\x63\x72\x69\x70\x74",
    "\x6c\x6f\x61\x64",
    "\x67\x6f\x6f\x67\x6c\x65",
    "\x69\x6d\x61",
    "\x64\x6f\x75\x62\x6c\x65\x63\x6c\x69\x63\x6b\x7c\x67\x6f\x6f\x67\x6c\x65\x73\x79\x6e\x64\x69\x63\x61\x74\x69\x6f\x6e\x7c\x61\x64\x73\x65\x72\x76\x69\x63\x65\x7c\x61\x6d\x61\x7a\x6f\x6e\x2d\x61\x64\x73\x79\x73\x74\x65\x6d\x7c\x70\x61\x67\x65\x61\x64\x7c\x61\x64\x73\x62\x79\x67\x6f\x6f\x67\x6c\x65\x7c\x67\x6f\x6f\x67\x6c\x65\x74\x61\x67\x6d\x61\x6e\x61\x67\x65\x72\x7c\x67\x6f\x6f\x67\x6c\x65\x74\x61\x67\x73\x65\x72\x76\x69\x63\x65\x73",
    "\x74\x6f\x53\x74\x72\x69\x6e\x67",
    "\x62\x69\x6e\x64",
    "\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65",
    "\x69\x73\x43\x6f\x6e\x6e\x65\x63\x74\x65\x64",
    "\x70\x61\x72\x65\x6e\x74\x45\x6c\x65\x6d\x65\x6e\x74",
    "\x66\x75\x6e\x63\x74\x69\x6f\x6e",
    "\x73\x74\x72\x69\x6e\x67",
    "\x67\x65\x74\x20",
  ];

  var _dp = Object.defineProperty.bind(Object);
  var _gdp = Object.getOwnPropertyDescriptor.bind(Object);
  var _H = location.hostname;

  function _md(d) {
    return _H === d || _H.endsWith("\x2e" + d);
  }

  function _N(fn, nm) {
    var body =
      "\x66\x75\x6e\x63\x74\x69\x6f\x6e\x20" +
      (nm != null ? nm : fn.name || "") +
      "\x28\x29\x20\x7b\x20\x5b\x6e\x61\x74\x69\x76\x65\x20\x63\x6f\x64\x65\x5d\x20\x7d";
    var _t = function toString() {
      return body;
    };
    try {
      _dp(_t, _$[47], {
        value: function toString() {
          return "\x66\x75\x6e\x63\x74\x69\x6f\x6e\x20\x74\x6f\x53\x74\x72\x69\x6e\x67\x28\x29\x20\x7b\x20\x5b\x6e\x61\x74\x69\x76\x65\x20\x63\x6f\x64\x65\x5d\x20\x7d";
        },
        configurable: !0,
        writable: !0,
      });
      _dp(fn, _$[47], { value: _t, configurable: !0, writable: !0 });
    } catch (_) {}
    return fn;
  }

  var _ua = navigator[_$[2]].replace(_$[0], _$[1]);
  _dp(navigator, _$[2], {
    get: function () {
      return _ua;
    },
    configurable: !0,
  });
  _dp(navigator, _$[3], {
    get: function () {
      return _$[4];
    },
    configurable: !0,
  });
  _dp(navigator, _$[5], {
    get: function () {
      return _$[6];
    },
    configurable: !0,
  });
  _dp(navigator, _$[7], {
    get: function () {
      return {
        brands: [
          { brand: _$[8], version: _$[14] },
          { brand: _$[9], version: _$[14] },
        ],
        mobile: !1,
        platform: _$[10],
        getHighEntropyValues: async function () {
          return {
            brands: [
              { brand: _$[8], version: _$[14] },
              { brand: _$[9], version: _$[14] },
            ],
            mobile: !1,
            platform: _$[10],
            architecture: _$[11],
            bitness: _$[12],
            model: "",
            uaFullVersion: _$[13],
          };
        },
      };
    },
    configurable: !0,
  });

  function _pih() {
    try {
      var _d = _gdp(Element.prototype, _$[16]);
      if (!_d) return;
      _dp(Element.prototype, _$[16], {
        set: function (v) {
          try {
            if (
              (this === document.body || this === document.documentElement) &&
              (v === "" || v == null)
            )
              return;
            return _d.set.call(this, v);
          } catch (e) {
            return _d.set.call(this, v);
          }
        },
        get: function () {
          return _d.get.call(this);
        },
        configurable: !0,
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

    window[_$[44]] = window[_$[44]] || {};
    window[_$[44]][_$[45]] = {
      AdDisplayContainer,
      AdsLoader,
      AdsManager,
      AdsRequest,
      AdsManagerLoadedEvent: {
        Type: {
          ADS_MANAGER_LOADED:
            "\x61\x64\x73\x4d\x61\x6e\x61\x67\x65\x72\x4c\x6f\x61\x64\x65\x64",
        },
      },
      AdErrorEvent: { Type: { AD_ERROR: "\x61\x64\x45\x72\x72\x6f\x72" } },
      AdEvent: {
        Type: {
          COMPLETE: "\x63\x6f\x6d\x70\x6c\x65\x74\x65",
          ALL_ADS_COMPLETED:
            "\x61\x6c\x6c\x41\x64\x73\x43\x6f\x6d\x70\x6c\x65\x74\x65\x64",
          STARTED: "\x73\x74\x61\x72\x74\x65\x64",
          PAUSED: "\x70\x61\x75\x73\x65\x64",
          RESUMED: "\x72\x65\x73\x75\x6d\x65\x64",
          SKIPPED: "\x73\x6b\x69\x70\x70\x65\x64",
          SKIPPABLE_STATE_CHANGED:
            "\x73\x6b\x69\x70\x70\x61\x62\x6c\x65\x53\x74\x61\x74\x65\x43\x68\x61\x6e\x67\x65\x64",
        },
      },
      ViewMode: {
        NORMAL: "\x6e\x6f\x72\x6d\x61\x6c",
        FULLSCREEN: "\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e",
      },
      UiElements: {
        AD_ATTRIBUTION: "\x61\x64\x41\x74\x74\x72\x69\x62\x75\x74\x69\x6f\x6e",
        COUNTDOWN: "\x63\x6f\x75\x6e\x74\x64\x6f\x77\x6e",
      },
    };

    var _ce = document.createElement.bind(document);
    var _src = _gdp(HTMLScriptElement.prototype, _$[41]);
    var _pk = !0;

    document.createElement = function (tag) {
      var el = _ce(tag);
      try {
        if (_pk && tag[_$[49]]() === _$[42] && _src) {
          _dp(el, _$[41], {
            set: function (val) {
              try {
                if (new RegExp(_$[25], "\x69").test(val)) {
                  _pk = !1;
                  document.createElement = _ce.bind(document);
                  setTimeout(function () {
                    el.dispatchEvent(new Event(_$[43]));
                  }, 50);
                  return;
                }
              } catch (_) {}
              _src.set.call(el, val);
            },
            get: function () {
              return _src.get.call(el);
            },
          });
        }
      } catch (_) {}
      return el;
    };
  }

  function _mb() {
    try {
      _dp(Navigator.prototype, _$[15], { get: void 0, configurable: !0 });
    } catch (_) {}
    try {
      delete Navigator.prototype[_$[15]];
    } catch (_) {}
    try {
      delete navigator[_$[15]];
    } catch (_) {}
    try {
      _dp(Navigator.prototype, _$[15], {
        value: void 0,
        writable: !0,
        configurable: !0,
        enumerable: !1,
      });
    } catch (_) {}
  }

  function _bjd() {
    var _od = null,
      _p = HTMLElement.prototype;
    while (_p) {
      _od = _gdp(_p, _$[17]);
      if (_od) break;
      _p = Object.getPrototypeOf(_p);
    }

    if (_od && _od.get) {
      var _og = _od.get;
      _dp(HTMLElement.prototype, _$[17], {
        get: _N(function () {
          try {
            var v = _og.call(this);
            if (v === null && this[_$[50]]) {
              if (
                this.style[_$[33]] === _$[35] ||
                this.style[_$[34]] === _$[36]
              )
                return null;
              return this[_$[51]] || document.body || document.documentElement;
            }
            return v;
          } catch (_) {
            return null;
          }
        }, _$[54] + _$[17]),
        configurable: !0,
      });
    }

    [_$[18], _$[19]].forEach(function (prop) {
      var _pd = _gdp(HTMLElement.prototype, prop);
      if (!_pd || !_pd.get) return;
      var _pg = _pd.get;
      _dp(HTMLElement.prototype, prop, {
        get: _N(function () {
          var v = _pg.call(this);
          if (v === 0 && this[_$[50]] && _od && _od.get.call(this) === null)
            return 1;
          return v;
        }, _$[54] + prop),
        configurable: !0,
      });
    });

    var _ogbcr = Element.prototype[_$[20]];
    Element.prototype[_$[20]] = _N(function getBoundingClientRect() {
      var r = _ogbcr.call(this);
      if (
        r.width === 0 &&
        r.height === 0 &&
        this[_$[50]] &&
        _od &&
        _od.get.call(this) === null
      )
        return new DOMRect(r.x, r.y, 1, 1);
      return r;
    }, _$[20]);

    var _gcs = window[_$[21]].bind(window);
    try {
      _dp(window, _$[21], {
        value: _N(
          new Proxy(_gcs, {
            apply: function (target, thisArg, args) {
              try {
                var st = Reflect.apply(target, thisArg, args);
                var el = args[0];
                if (
                  el instanceof HTMLElement &&
                  (el.style[_$[33]] === _$[35] || el.style[_$[34]] === _$[36])
                )
                  return st;
                var bh =
                  el instanceof HTMLElement &&
                  el[_$[50]] &&
                  _od &&
                  _od.get.call(el) === null &&
                  st[_$[33]] === _$[35];
                if (!bh) return st;
                return new Proxy(st, {
                  get: function (s, p) {
                    if (p === _$[33]) return _$[37];
                    if (p === _$[34]) return _$[38];
                    var v = s[p];
                    return typeof v === _$[52] ? v.bind(s) : v;
                  },
                });
              } catch (_) {
                return Reflect.apply(target, thisArg, args);
              }
            },
          }),
          _$[21],
        ),
        writable: !0,
        configurable: !0,
      });
    } catch (_) {}

    try {
      _dp(window, _$[22], {
        value: { loaded: !0, push: Array.prototype.push, length: 0 },
        configurable: !0,
        writable: !0,
      });
    } catch (_) {
      window[_$[22]] = { loaded: !0, push: Array.prototype.push, length: 0 };
    }

    var _gt = {
      cmd: {
        push: function (fn) {
          try {
            fn();
          } catch (_) {}
        },
      },
      pubads: function () {
        return {
          enableSingleRequest: function () {},
          collapseEmptyDivs: function () {},
          setTargeting: function () {
            return _gt.pubads();
          },
          addEventListener: function () {},
          refresh: function () {},
          disableInitialLoad: function () {},
          enableAsyncRendering: function () {},
        };
      },
      enableServices: function () {},
      defineSlot: function () {
        return {
          addService: function () {
            return _gt.defineSlot();
          },
          setTargeting: function () {
            return _gt.defineSlot();
          },
        };
      },
      display: function () {},
      destroySlots: function () {},
      apiReady: !0,
      pubadsReady: !0,
    };
    try {
      _dp(window, _$[23], { value: _gt, configurable: !0, writable: !0 });
    } catch (_) {
      window[_$[23]] = _gt;
    }

    var _re = new RegExp(_$[46]);
    var _f = window[_$[24]].bind(window);
    try {
      _dp(window, _$[24], {
        value: _N(async function fetch(input, init) {
          var url =
            typeof input === _$[53] ? input : (input && input.url) || "";
          if (_re.test(url)) {
            try {
              return await _f(input, init);
            } catch (_) {
              return new Response("", { status: 200 });
            }
          }
          return _f(input, init);
        }, _$[24]),
        writable: !0,
        configurable: !0,
      });
    } catch (_) {}
  }

  function _raa() {
    document.addEventListener(_$[39], function () {
      [_$[26], _$[27]].forEach(function (id) {
        document.getElementById(id)?.remove();
      });
    });
  }

  function _eznt() {
    var style = document.createElement("\x73\x74\x79\x6c\x65");
    style.textContent =
      "\x40\x69\x6d\x70\x6f\x72\x74\x20\x75\x72\x6c\x28\x27\x68\x74\x74\x70\x73\x3a\x2f\x2f\x66\x6f\x6e\x74\x73\x2e\x67\x6f\x6f\x67\x6c\x65\x61\x70\x69\x73\x2e\x63\x6f\x6d\x2f\x63\x73\x73\x32\x3f\x66\x61\x6d\x69\x6c\x79\x3d\x43\x61\x69\x72\x6f\x3a\x77\x67\x68\x74\x40\x34\x30\x30\x3b\x36\x30\x30\x3b\x37\x30\x30\x26\x64\x69\x73\x70\x6c\x61\x79\x3d\x73\x77\x61\x70\x27\x29\x3b" +
      ".ezio-toast-container{position:fixed;top:20px;right:20px;z-index:2147483647;pointer-events:none;display:flex;flex-direction:column;gap:10px}" +
      ".ezio-toast{pointer-events:auto;min-width:340px;max-width:420px;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);border:1px solid rgba(233,69,96,0.3);border-radius:16px;padding:0;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 40px rgba(233,69,96,0.15),inset 0 1px 0 rgba(255,255,255,0.05);font-family:'Cairo','Segoe UI',Tahoma,sans-serif;direction:rtl;transform:translateX(120%);opacity:0;transition:all 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)}" +
      ".ezio-toast.ezio-show{transform:translateX(0);opacity:1}" +
      ".ezio-toast.ezio-hide{transform:translateX(120%);opacity:0;transition:all 0.4s cubic-bezier(0.6,-0.28,0.735,0.045)}" +
      ".ezio-toast-glow{position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;border-radius:17px;background:linear-gradient(45deg,rgba(233,69,96,0.4),rgba(0,210,255,0.4),rgba(233,69,96,0.4));background-size:400% 400%;animation:ezio-glow 3s ease infinite;z-index:-1;filter:blur(8px)}" +
      "@keyframes ezio-glow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}" +
      ".ezio-toast-progress{height:3px;background:linear-gradient(90deg,#e94560,#00d2ff,#e94560);background-size:200% 100%;animation:ezio-progress-shine 2s linear infinite;transform-origin:right;transition:transform linear}" +
      "@keyframes ezio-progress-shine{0%{background-position:200% 0}100%{background-position:-200% 0}}" +
      ".ezio-toast-body{padding:16px 20px;display:flex;align-items:flex-start;gap:14px}" +
      ".ezio-toast-icon{flex-shrink:0;width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:linear-gradient(135deg,rgba(233,69,96,0.2),rgba(233,69,96,0.05));border:1px solid rgba(233,69,96,0.3);animation:ezio-icon-pulse 2s ease-in-out infinite}" +
      "@keyframes ezio-icon-pulse{0%,100%{box-shadow:0 0 0 0 rgba(233,69,96,0.3)}50%{box-shadow:0 0 20px 5px rgba(233,69,96,0.15)}}" +
      ".ezio-toast-content{flex:1;min-width:0}" +
      ".ezio-toast-title{font-size:14px;font-weight:700;color:#e94560;margin:0 0 4px 0;display:flex;align-items:center;gap:6px;letter-spacing:0.3px}" +
      ".ezio-toast-badge{font-size:9px;font-weight:600;background:linear-gradient(135deg,#e94560,#c23152);color:white;padding:2px 7px;border-radius:20px;letter-spacing:0.5px;text-transform:uppercase}" +
      ".ezio-toast-message{font-size:13px;font-weight:400;color:rgba(255,255,255,0.75);margin:0;line-height:1.6}" +
      ".ezio-toast-close{position:absolute;top:10px;left:12px;width:24px;height:24px;border:none;background:rgba(255,255,255,0.05);border-radius:8px;color:rgba(255,255,255,0.4);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;padding:0;line-height:1}" +
      ".ezio-toast-close:hover{background:rgba(233,69,96,0.2);color:#e94560;transform:rotate(90deg)}" +
      ".ezio-toast-footer{padding:0 20px 14px;display:flex;align-items:center;gap:6px}" +
      ".ezio-toast-footer-text{font-size:10px;color:rgba(255,255,255,0.25);font-weight:600;letter-spacing:0.5px}" +
      ".ezio-toast-footer-dot{width:3px;height:3px;border-radius:50%;background:rgba(233,69,96,0.5)}" +
      ".ezio-toast-warn .ezio-toast-icon{background:linear-gradient(135deg,rgba(255,171,0,0.2),rgba(255,171,0,0.05));border-color:rgba(255,171,0,0.3);animation-name:ezio-icon-pulse-warn}" +
      "@keyframes ezio-icon-pulse-warn{0%,100%{box-shadow:0 0 0 0 rgba(255,171,0,0.3)}50%{box-shadow:0 0 20px 5px rgba(255,171,0,0.15)}}" +
      ".ezio-toast-warn .ezio-toast-title{color:#ffab00}" +
      ".ezio-toast-warn .ezio-toast-badge{background:linear-gradient(135deg,#ffab00,#e69500)}" +
      ".ezio-toast-warn .ezio-toast-progress{background:linear-gradient(90deg,#ffab00,#00d2ff,#ffab00);background-size:200% 100%;animation:ezio-progress-shine 2s linear infinite}" +
      ".ezio-toast-warn{border-color:rgba(255,171,0,0.3)}" +
      ".ezio-toast-warn .ezio-toast-glow{background:linear-gradient(45deg,rgba(255,171,0,0.4),rgba(0,210,255,0.4),rgba(255,171,0,0.4));background-size:400% 400%;animation:ezio-glow 3s ease infinite}";

    document.addEventListener(_$[39], function () {
      document.head.appendChild(style);

      var container = document.createElement("\x64\x69\x76");
      container.className =
        "\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72";
      document.body.appendChild(container);

      function _sht(options) {
        var opts = Object.assign(
          {
            icon: "\ud83d\udee1\ufe0f",
            title: "\x45\x7a\x69\x6f\x20\x53\x68\x69\x65\x6c\x64",
            badge: "\x50\x52\x4f\x54\x45\x43\x54\x45\x44",
            message: "",
            type: "\x65\x72\x72\x6f\x72",
            duration: 4000,
          },
          options,
        );

        var toast = document.createElement("\x64\x69\x76");
        toast.className =
          "\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74" +
          (opts.type === "\x77\x61\x72\x6e"
            ? "\x20\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x77\x61\x72\x6e"
            : "");
        toast[_$[16]] =
          "\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x67\x6c\x6f\x77\x22\x3e\x3c\x2f\x64\x69\x76\x3e" +
          "\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x70\x72\x6f\x67\x72\x65\x73\x73\x22\x20\x73\x74\x79\x6c\x65\x3d\x22\x74\x72\x61\x6e\x73\x66\x6f\x72\x6d\x3a\x73\x63\x61\x6c\x65\x58\x28\x31\x29\x22\x3e\x3c\x2f\x64\x69\x76\x3e" +
          "\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x62\x6f\x64\x79\x22\x3e" +
          "\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x69\x63\x6f\x6e\x22\x3e" +
          opts.icon +
          "\x3c\x2f\x64\x69\x76\x3e" +
          "\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x63\x6f\x6e\x74\x65\x6e\x74\x22\x3e" +
          "\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x74\x69\x74\x6c\x65\x22\x3e" +
          opts.title +
          "\x3c\x73\x70\x61\x6e\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x62\x61\x64\x67\x65\x22\x3e" +
          opts.badge +
          "\x3c\x2f\x73\x70\x61\x6e\x3e" +
          "\x3c\x2f\x64\x69\x76\x3e" +
          "\x3c\x70\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x6d\x65\x73\x73\x61\x67\x65\x22\x3e" +
          opts.message +
          "\x3c\x2f\x70\x3e" +
          "\x3c\x2f\x64\x69\x76\x3e" +
          "\x3c\x2f\x64\x69\x76\x3e" +
          "\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x66\x6f\x6f\x74\x65\x72\x22\x3e" +
          "\x3c\x73\x70\x61\x6e\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x66\x6f\x6f\x74\x65\x72\x2d\x74\x65\x78\x74\x22\x3e\x42\x79\x70\x61\x73\x73\x20\x43\x69\x6d\x61\x4e\x6f\x77\x3c\x2f\x73\x70\x61\x6e\x3e" +
          "\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x66\x6f\x6f\x74\x65\x72\x2d\x64\x6f\x74\x22\x3e\x3c\x2f\x64\x69\x76\x3e" +
          "\x3c\x73\x70\x61\x6e\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x66\x6f\x6f\x74\x65\x72\x2d\x74\x65\x78\x74\x22\x3e\x45\x7a\x69\x6f\x20\x41\x75\x64\x69\x74\x6f\x72\x65\x3c\x2f\x73\x70\x61\x6e\x3e" +
          "\x3c\x2f\x64\x69\x76\x3e" +
          "\x3c\x62\x75\x74\x74\x6f\x6e\x20\x63\x6c\x61\x73\x73\x3d\x22\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x63\x6c\x6f\x73\x65\x22\x3e\u2715\x3c\x2f\x62\x75\x74\x74\x6f\x6e\x3e";

        container.appendChild(toast);

        var progress = toast.querySelector(
          "\x2e\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x70\x72\x6f\x67\x72\x65\x73\x73",
        );
        requestAnimationFrame(function () {
          toast.classList.add("\x65\x7a\x69\x6f\x2d\x73\x68\x6f\x77");
          progress.style.transition =
            "\x74\x72\x61\x6e\x73\x66\x6f\x72\x6d\x20" +
            opts.duration +
            "\x6d\x73\x20\x6c\x69\x6e\x65\x61\x72";
          progress.style.transform = "\x73\x63\x61\x6c\x65\x58\x28\x30\x29";
        });

        function _ct() {
          toast.classList.remove("\x65\x7a\x69\x6f\x2d\x73\x68\x6f\x77");
          toast.classList.add("\x65\x7a\x69\x6f\x2d\x68\x69\x64\x65");
          setTimeout(function () {
            toast.remove();
          }, 400);
        }

        toast
          .querySelector(
            "\x2e\x65\x7a\x69\x6f\x2d\x74\x6f\x61\x73\x74\x2d\x63\x6c\x6f\x73\x65",
          )
          .addEventListener("\x63\x6c\x69\x63\x6b", _ct);
        setTimeout(_ct, opts.duration);
        return toast;
      }

      document.body.addEventListener(
        "\x63\x6c\x69\x63\x6b",
        function (e) {
          var link = e.target.closest("\x61");
          if (!link) return;
          var href = link.getAttribute("\x68\x72\x65\x66") || "";
          if (/\/pig\//i.test(href)) {
            e.preventDefault();
            e.stopPropagation();
            _sht({
              icon: "\ud83d\udee1\ufe0f",
              title:
                "\u062A\u0645\x20\u062D\u0638\u0631\x20\u0627\u0644\u0631\u0627\u0628\u0637\x20\u0627\u0644\u0645\u0632\u064A\u0641",
              badge: "\u0645\u062D\u0645\u064A",
              message:
                "\u062A\u0645\x20\u0645\u0646\u0639\x20\u0627\u0644\u062A\u0648\u062C\u064A\u0647\x20\u0625\u0644\u0649\x20\u0635\u0641\u062D\u0629\x20\u0625\u0639\u0644\u0627\u0646\u064A\u0629\x2E\x20\u0627\u0646\u062A\u0638\u0631\x20\u0627\u0646\u062A\u0647\u0627\u0621\x20\u0627\u0644\u0639\u062F\x20\u0627\u0644\u062A\u0646\u0627\u0632\u0644\u064A\x20\u0644\u0644\u062D\u0635\u0648\u0644\x20\u0639\u0644\u0649\x20\u0627\u0644\u0631\u0627\u0628\u0637\x20\u0627\u0644\u062D\u0642\u064A\u0642\u064A\x2E",
              type: "\x77\x61\x72\x6e",
              duration: 5000,
            });
          }
        },
        !0,
      );

      window.__ezioToast = _sht;
    });
  }

  function _prf() {
    var _ld = Object.getOwnPropertyDescriptor(Location.prototype, "href");
    if (_ld && _ld.set) {
      var _ls = _ld.set;
      _dp(Location.prototype, "href", {
        set: _N(function (v) {
          try {
            var u = new URL(v, location.href);
            if (u.pathname === "/" && u.hostname === location.hostname) return;
          } catch (_) {}
          _ls.call(this, v);
        }, "href"),
        get: _ld.get,
        configurable: !0,
      });
    }
    var _lr = Location.prototype.replace;
    Location.prototype.replace = _N(function replace(v) {
      try {
        var u = new URL(v, location.href);
        if (u.pathname === "/" && u.hostname === location.hostname) return;
      } catch (_) {}
      _lr.call(this, v);
    }, "replace");
  }

  function _fag() {
    var _fa = [];
    var _ph = new Proxy(_fa, {
      get: function (t, p) {
        if (p === "push")
          return function () {
            return 1;
          };
        return t[p];
      },
    });
    try {
      _dp(window, _$[22], {
        get: function () {
          return _ph;
        },
        set: function () {},
        configurable: !0,
      });
      Object.freeze(_ph);
    } catch (_) {}
  }

  if (!_isFF) _mb();

  if (_md(_$[28]) || _md(_$[29])) {
    _prf();
  }

  [
    {
      d: _$[28],
      fn: function () {
        if (!_isFF) _bjd();
      },
    },
    {
      d: _$[29],
      fn: function () {
        _bjd();
      },
    },
    { d: _$[30], fn: _bima },
    {
      d: _$[31],
      fn: function () {
        _eznt();
      },
    },
    {
      d: _$[32],
      fn: function () {
        _pih();
        _bjd();
      },
    },
  ].forEach(function (r) {
    try {
      if (_md(r.d)) r.fn();
    } catch (_) {}
  });
})();
