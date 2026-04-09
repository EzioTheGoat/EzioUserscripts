// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Ezio Scripts
// @version      5.6
// @description  This script enhances your experience by blocking popups, preventing fake redirects, and blocking intrusive advertisements for a seamless streaming experience.
// @author       Ezio Auditore
// @icon         https://i.ibb.co/zVkV324z/Ezio.png
// @match        *://*.cimanow.cc/*
// @match        *://*.cimanowinc.com/*
// @match        *://*.cimanow.online/*
// @match        *://*.upns.online/*
// @match        *://*.freex2line.online/*
// @match        *://*.pp.ua/*
// @require      https://userscripts.adtidy.org/release/adguard-extra/1.0/adguard-extra.user.js
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
  function _pxhr() {
    var _origOpen = XMLHttpRequest.prototype.open;
    var _origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = _N(function open(method, url) {
      this._ezUrl = typeof url === "string" ? url : url ? String(url) : "";
      return _origOpen.apply(this, arguments);
    }, "open");

    XMLHttpRequest.prototype.send = _N(function send() {
      var self = this;
      var url = self._ezUrl || "";
      if (/iclick|js_build=/.test(url)) {
        _origSend.apply(this, arguments);
        self.addEventListener("load", function () {
          console.log("[EZ-XHR-RESP-STATUS]", self.status);
          console.log(
            "[EZ-XHR-RESP-BODY]",
            self.responseText.substring(0, 500),
          );
        });
        self.addEventListener("error", function () {
          console.log("[EZ-XHR-RESP-ERROR] request failed");
        });
        return;
      }
      console.log("[EZ-XHR-PASS]", url);
      return _origSend.apply(this, arguments);
    }, "send");

    var _origFetch = window.fetch.bind(window);
    try {
      _dp(window, "fetch", {
        value: _N(async function fetch(input, init) {
          var url =
            typeof input === "string" ? input : (input && input.url) || "";
          if (/iclick|js_build=/.test(url)) {
            try {
              var r = await _origFetch(input, init);
              var text = await r.clone().text();
              console.log("[EZ-FETCH-RESP-STATUS]", r.status);
              console.log("[EZ-FETCH-RESP-BODY]", text.substring(0, 500));
              return r;
            } catch (e) {
              console.log("[EZ-FETCH-RESP-ERROR]", e.message);
              return new Response("{}", { status: 200 });
            }
          }
          console.log("[EZ-FETCH-PASS]", url);
          return _origFetch(input, init);
        }, "fetch"),
        writable: true,
        configurable: true,
      });
    } catch (_) {}
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
        _pxhr();
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
