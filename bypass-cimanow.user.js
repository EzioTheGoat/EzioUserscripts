// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Ezio Scripts
// @version      5.8
// @description  Blocks popups, ads, fake redirects + extracts download links and displays them in a premium UI
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
      //  _pxhr();
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

(function () {
  "use strict";

  const _log = console.log.bind(console);
  const _setTimeout = window.setTimeout.bind(window);
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

  function $id(i) {
    try {
      return _getElementById.call(document, i);
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

  _log("[CimaNow Bypass] ⏳ Watch page detected.");

  const UI_PAGE = "https://eziothegoat.github.io/dl/cimanow.html";
  const DATA_KEY = "ezio_cimanow_data";
  const CHANNEL_NAME = "ezio_cimanow_channel";

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

  function parseArabicNumber(txt) {
    for (const [key, val] of Object.entries(arabicCompoundOrdinals)) {
      if (txt.includes(key)) return { value: val, matched: key };
    }
    const compoundRe = new RegExp(
      `(${unitsWords})[\\s\\-_]*و[\\s\\-_]*(${tensWords})`,
      "i",
    );
    const cm = txt.match(compoundRe);
    if (cm)
      return {
        value: (arabicUnits[cm[1]] || 0) + (arabicTens[cm[2]] || 0),
        matched: cm[0],
      };
    for (const [key, val] of Object.entries(arabicTens)) {
      if (txt.includes(key)) return { value: val, matched: key };
    }
    for (const key of Object.keys(arabicOrdinals).sort(
      (a, b) => b.length - a.length,
    )) {
      if (txt.includes(key))
        return { value: arabicOrdinals[key], matched: key };
    }
    return null;
  }

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

    const smN = cleaned.match(/(?:ج|جزء|موسم|الموسم|season|s)[\s\-_]*(\d+)/i);
    if (smN) {
      info.season = parseInt(smN[1]);
    } else {
      const sp = cleaned.match(/(?:ج|جزء|موسم|الموسم|season|s)[\s\-_]*/i);
      if (sp) {
        const p = parseArabicNumber(cleaned.slice(sp.index + sp[0].length));
        if (p) info.season = p.value;
      }
    }

    const emN = cleaned.match(/(?:ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*(\d+)/i);
    if (emN) {
      info.episode = parseInt(emN[1]);
    } else {
      const ep = cleaned.match(/(?:ح|حلقة|الحلقة|episode|ep|e)[\s\-_]*/i);
      if (ep) {
        const p = parseArabicNumber(cleaned.slice(ep.index + ep[0].length));
        if (p) info.episode = p.value;
      }
    }

    if (info.season === null && info.episode === null) {
      const p = parseArabicNumber(cleaned);
      if (p) info.season = p.value;
    }
    if (info.season !== null || info.episode !== null) info.type = "series";
    if (info.type === "movie") {
      info.season = null;
      info.episode = null;
    }

    if (/مترجم/.test(cleaned)) info.trans = "مترجم";
    else if (/مدبلج/.test(cleaned)) info.trans = "مدبلج";

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
      const yi = slug.lastIndexOf(info.year);
      if (yi !== -1)
        slug = slug.slice(0, yi) + slug.slice(yi + info.year.length);
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
      if (!ul.querySelectorAll("a").length) return null;

      const groups = {};
      ul.querySelectorAll("li").forEach(function (li, liIdx) {
        const span = li.querySelector("span");
        const groupName = span
          ? span.textContent.replace(/[:\s]+$/, "").trim()
          : "Group " + liIdx;
        if (!groupName) return;
        if (!groups[groupName]) groups[groupName] = [];

        li.querySelectorAll("a").forEach(function (a) {
          const href = a.getAttribute("href");
          if (!href || href === "#") return;
          let linkText = "";
          a.childNodes.forEach(function (n) {
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
            quality: quality,
            name: linkText || "Download",
            size: size,
            url: url,
          });
        });
      });

      return Object.keys(groups).length ? groups : null;
    } catch (e) {
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
    } catch (e) {
      _log("[CimaNow Bypass] ⚠️ localStorage save failed:", e.message);
    }

    try {
      var bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage({ type: "ezio_cimanow_payload", payload: payload });
      _log("[CimaNow Bypass] ✅ BroadcastChannel sent");
      _setTimeout(function () {
        bc.close();
      }, 2000);
    } catch (e) {
      _log("[CimaNow Bypass] ⚠️ BroadcastChannel failed:", e.message);
    }

    var encodedPayload = "";
    try {
      encodedPayload = btoa(encodeURIComponent(JSON.stringify(payload)));
    } catch (e) {}

    var targetURL;
    if (encodedPayload.length > 0 && encodedPayload.length < 8000) {
      targetURL = UI_PAGE + "#" + encodedPayload;
      _log(
        "[CimaNow Bypass] 📎 Hash method (size: " + encodedPayload.length + ")",
      );
    } else {
      targetURL = UI_PAGE;
      _log(
        "[CimaNow Bypass] 📎 localStorage method (payload too large for hash)",
      );
    }

    _setTimeout(function () {
      _log("[CimaNow Bypass] 🚀 Redirecting to UI: " + UI_PAGE);
      window.location.href = targetURL;
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
      _log(
        "[CimaNow Bypass] ✅ Extracted " +
          total +
          " links from " +
          Object.keys(data).length +
          " groups.",
      );
      _setTimeout(function () {
        sendDataToUI(data);
      }, 0);
    }
  }

  _setTimeout(function () {
    const obs = new MutationObserver(function (mutations) {
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
              if (extracted) {
                obs.disconnect();
                return;
              }
            }
            try {
              const inner = _elQS.call(node, "#download");
              if (inner) {
                _log("[CimaNow Bypass] 🎯 Found #download inside added node!");
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
      _log("[CimaNow Bypass] 👁️ MutationObserver active — v6.0");
    }
    _setTimeout(function () {
      obs.disconnect();
    }, 60000);
  }, 0);

  let pollCount = 0;
  const poller = window.setInterval(function () {
    if (extracted) {
      window.clearInterval(poller);
      return;
    }
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
    } catch (e) {}
  }, 500);

  function showTimeoutPage() {
    var timeoutHTML =
      '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>CimaNow Bypass — Timeout</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">' +
      "<style>" +
      "*{margin:0;padding:0;box-sizing:border-box}" +
      'body{background:#030014;color:#f0f0ff;font-family:"Tajawal",sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}' +
      'body::before{content:"";position:fixed;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(239,68,68,.08),transparent 60%),radial-gradient(ellipse 80% 50% at 20% 80%,rgba(99,102,241,.06),transparent 50%)}' +
      ".tc{position:relative;z-index:2;text-align:center;max-width:480px;padding:48px 36px;background:rgba(15,15,40,.8);border:1px solid rgba(239,68,68,.15);border-radius:28px;backdrop-filter:blur(24px);animation:fi .6s ease both}" +
      "@keyframes fi{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}" +
      ".ti{width:72px;height:72px;border-radius:22px;margin:0 auto 24px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);display:flex;align-items:center;justify-content:center;color:#f87171}" +
      ".tc h2{font-size:24px;font-weight:900;margin-bottom:12px;background:linear-gradient(135deg,#fff,rgba(248,113,113,.8));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}" +
      ".tc p{font-size:14px;color:rgba(255,255,255,.4);line-height:1.8;margin-bottom:28px}" +
      ".ta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}" +
      ".tb{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;border:none;font-family:inherit;transition:all .3s;min-height:48px}" +
      ".tp{background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;box-shadow:0 8px 32px rgba(99,102,241,.3)}" +
      ".tp:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(99,102,241,.4)}" +
      ".ts{background:rgba(255,255,255,.04);color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.08)}" +
      ".ts:hover{background:rgba(255,255,255,.08);color:#fff;transform:translateY(-3px)}" +
      ".th{margin-top:20px;font-size:11px;color:rgba(255,255,255,.15)}" +
      "</style></head><body>" +
      '<div class="tc">' +
      '<div class="ti"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>' +
      "<h2>انتهت المهلة الزمنية</h2>" +
      "<p>لم يتم العثور على روابط التحميل خلال 30 ثانية. قد يكون المحتوى غير متاح أو أن الصفحة لم تحمّل بالكامل.</p>" +
      '<div class="ta">' +
      '<button class="tb tp" onclick="location.reload()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg> إعادة المحاولة</button>' +
      '<button class="tb ts" onclick="history.back()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> رجوع</button>' +
      "</div>" +
      '<div class="th">Ezio Auditore — CimaNow Bypass v6.0</div>' +
      "</div></body></html>";

    try {
      window.stop();
      document.open();
      document.write(timeoutHTML);
      document.close();
    } catch (e) {
      try {
        var blob = new Blob([timeoutHTML], { type: "text/html;charset=utf-8" });
        location.replace(URL.createObjectURL(blob));
      } catch (e2) {}
    }
  }

  _setTimeout(function () {
    try {
      var indicator = document.createElement("div");
      indicator.id = "ezio-indicator";
      indicator.innerHTML =
        '<div style="position:fixed;bottom:20px;left:20px;z-index:99999;display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:14px;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.25);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:#a5b4fc;font-family:Tajawal,sans-serif;font-size:12px;font-weight:700;box-shadow:0 8px 32px rgba(0,0,0,.3);animation:ezioSlideIn .5s ease both">' +
        '<div style="width:8px;height:8px;border-radius:50%;background:#818cf8;animation:ezioPulse 1.5s ease infinite"></div>' +
        "🦅 Ezio Bypass — جارٍ استخراج الروابط..." +
        "</div>";
      var style = document.createElement("style");
      style.textContent =
        "@keyframes ezioSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes ezioPulse{0%,100%{opacity:1}50%{opacity:.3}}";
      document.head.appendChild(style);
      document.body.appendChild(indicator);
    } catch (e) {}
  }, 1000);
})();


