// ==UserScript==
// @name         Bypass CimaNow — UI
// @namespace    Ezio Scripts
// @version      2.0
// @description  Extracts download links from CimaNow watch pages and displays them in a premium UI
// @match        *://*.cimanow.cc/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const _log = console.log.bind(console);
  const _setTimeout = window.setTimeout.bind(window);
  const _Blob = window.Blob;
  const _createObjectURL = URL.createObjectURL.bind(URL);
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

  _log("[CimaNow Bypass] ⏳ — Watch page detected.");

  const isMobile = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(
    navigator.userAgent,
  );
  _log("[CimaNow Bypass] 📱 isMobile:", isMobile);

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
    if (cm) {
      return {
        value: (arabicUnits[cm[1]] || 0) + (arabicTens[cm[2]] || 0),
        matched: cm[0],
      };
    }
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

  let extracted = false;

  const _cacheKey = "ezio_cn_" + location.pathname + location.search;
  try {
    const _cached = sessionStorage.getItem(_cacheKey);
    if (_cached) {
      const _data = JSON.parse(_cached);
      if (_data && Object.keys(_data).length) {
        _log("[CimaNow Bypass] ⚡ Cached data found — skipping extraction");
        extracted = true;
        _setTimeout(function () {
          launchUI(_data);
        }, 0);
      }
    }
  } catch (e) {}

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

  function getQM(q) {
    const map = {
      "1080p": {
        label: "1080p",
        tag: "FULL HD",
        color: "#10b981",
        border: "rgba(16,185,129,0.3)",
        bg: "rgba(16,185,129,0.1)",
        tier: 4,
        emoji: "🔥",
      },
      "720p": {
        label: "720p",
        tag: "HD",
        color: "#3b82f6",
        border: "rgba(59,130,246,0.3)",
        bg: "rgba(59,130,246,0.1)",
        tier: 3,
        emoji: "💎",
      },
      "480p": {
        label: "480p",
        tag: "SD",
        color: "#f59e0b",
        border: "rgba(245,158,11,0.3)",
        bg: "rgba(245,158,11,0.1)",
        tier: 2,
        emoji: "⚡",
      },
      "360p": {
        label: "360p",
        tag: "LOW",
        color: "#ef4444",
        border: "rgba(239,68,68,0.3)",
        bg: "rgba(239,68,68,0.1)",
        tier: 1,
        emoji: "📱",
      },
    };
    return (
      map[q] || {
        label: q || "Link",
        tag: "",
        color: "#8b5cf6",
        border: "rgba(139,92,246,0.3)",
        bg: "rgba(139,92,246,0.1)",
        tier: 0,
        emoji: "🔗",
      }
    );
  }

  function injectInteractiveFeatures(isMobile) {
    try {
      if (isMobile) document.body.classList.add("is-mobile");
      if (!isMobile) {
        var particlesEl = document.getElementById("particles");
        if (particlesEl && !particlesEl.children.length) {
          for (var i = 0; i < 30; i++) {
            var p = document.createElement("div");
            p.className = "particle";
            p.style.left = Math.random() * 100 + "%";
            p.style.animationDuration = 8 + Math.random() * 15 + "s";
            p.style.animationDelay = Math.random() * 10 + "s";
            p.style.width = p.style.height = 1 + Math.random() * 2 + "px";
            p.style.opacity = 0.05 + Math.random() * 0.15;
            particlesEl.appendChild(p);
          }
        }
      }

      var loader = document.getElementById("loader");
      var page = document.getElementById("mainPage");

      if (isMobile) {
        if (loader) loader.style.display = "none";
        if (page) {
          page.classList.add("visible");
          page.style.opacity = "1";
          page.style.transform = "none";
        }
        doCounters();
      } else {
        var fill = document.getElementById("loaderFill");
        var progress = 0;
        var loadInterval = setInterval(function () {
          progress += Math.random() * 25 + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);
            if (fill) fill.style.width = "100%";
            _setTimeout(function () {
              if (loader) loader.classList.add("hidden");
              if (page) page.classList.add("visible");
              doCounters();
            }, 400);
          } else {
            if (fill) fill.style.width = progress + "%";
          }
        }, 200);
      }

      function doCounters() {
        if (isMobile) return;
        document.querySelectorAll("[data-count]").forEach(function (el) {
          var target = parseInt(el.getAttribute("data-count"));
          if (isNaN(target)) return;
          var current = 0;
          var step = Math.max(1, Math.ceil(target / 30));
          var interval = setInterval(function () {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current;
          }, 40);
        });
      }

      var toastTimer;
      function showToast(msg) {
        var toast = document.getElementById("toast");
        var toastMsg = document.getElementById("toastMsg");
        if (!toast || !toastMsg) return;
        toastMsg.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = _setTimeout(function () {
          toast.classList.remove("show");
        }, 2500);
      }

      function ezioCopy(url, btn) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(url)
            .then(function () {
              showToast("تم نسخ الرابط بنجاح! 🎉");
              flashBtn(btn);
            })
            .catch(function () {
              fallbackCopy(url, btn);
            });
        } else {
          fallbackCopy(url, btn);
        }
      }

      function fallbackCopy(url, btn) {
        var ta = document.createElement("textarea");
        ta.value = url;
        ta.style.cssText = "position:fixed;opacity:0;left:-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          showToast("تم نسخ الرابط! 📋");
          flashBtn(btn);
        } catch (e) {
          showToast("فشل النسخ ❌");
        }
        document.body.removeChild(ta);
      }

      function flashBtn(btn) {
        if (!btn) return;
        btn.style.color = "#34d399";
        btn.style.transform = "scale(1.3)";
        _setTimeout(function () {
          btn.style.color = "";
          btn.style.transform = "";
        }, 600);
      }

      function ezioNav(card) {
        var url = card.getAttribute("data-url") || card.getAttribute("href");
        if (!isMobile) {
          var ripple = card.querySelector(".qc-ripple");
          if (ripple) {
            var rect = card.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height) * 2;
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = "50%";
            ripple.style.top = "50%";
            ripple.style.marginLeft = -size / 2 + "px";
            ripple.style.marginTop = -size / 2 + "px";
            ripple.style.transform = "scale(0)";
            ripple.style.opacity = "1";
            requestAnimationFrame(function () {
              ripple.style.transition =
                "transform .5s cubic-bezier(.22,1,.36,1),opacity .5s";
              ripple.style.transform = "scale(1)";
              ripple.style.opacity = "0";
            });
          }
        }
        _setTimeout(
          function () {
            if (url) window.open(url, "_blank");
          },
          isMobile ? 50 : 200,
        );
      }

      document.addEventListener("click", function (e) {
        var navEl = e.target.closest('[data-action="nav"]');
        if (navEl) {
          e.preventDefault();
          ezioNav(navEl);
          return;
        }

        var copyEl = e.target.closest('[data-action="copy"]');
        if (copyEl) {
          e.preventDefault();
          e.stopPropagation();
          var url = copyEl.getAttribute("data-copy-url");
          if (url) ezioCopy(url, copyEl);
          return;
        }

        var grpHeader = e.target.closest(".grp-h");
        if (grpHeader) {
          grpHeader.parentElement.classList.toggle("grp-collapsed");
          return;
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.shiftKey && e.key === "C") {
          e.preventDefault();
          var allUrls = [];
          document.querySelectorAll("[data-url]").forEach(function (el) {
            var u = el.getAttribute("data-url");
            if (u && allUrls.indexOf(u) === -1) allUrls.push(u);
          });
          if (allUrls.length && navigator.clipboard) {
            navigator.clipboard.writeText(allUrls.join("\n")).then(function () {
              showToast("تم نسخ جميع الروابط (" + allUrls.length + ") 🚀");
            });
          }
        }
      });

      // ═══ INTERSECTION OBSERVER — DESKTOP ONLY ═══
      if (!isMobile && "IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
        );
        _setTimeout(function () {
          document.querySelectorAll(".grp").forEach(function (g) {
            g.style.opacity = "0";
            g.style.transform = "translateY(30px)";
            g.style.transition =
              "opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)";
            io.observe(g);
          });
        }, 1200);
      }

      // ═══ PARALLAX — DESKTOP ONLY + THROTTLED ═══
      if (!isMobile && window.matchMedia("(hover:hover)").matches) {
        var hero = document.querySelector(".hero-icon-wrap");
        if (hero) {
          var ticking = false;
          document.addEventListener(
            "mousemove",
            function (e) {
              if (!ticking) {
                ticking = true;
                requestAnimationFrame(function () {
                  var x = (e.clientX / window.innerWidth - 0.5) * 12;
                  var y = (e.clientY / window.innerHeight - 0.5) * 12;
                  hero.style.transform =
                    "perspective(600px) rotateY(" +
                    x +
                    "deg) rotateX(" +
                    -y +
                    "deg)";
                  ticking = false;
                });
              }
            },
            { passive: true },
          );
        }
      }

      _log("[CimaNow Bypass] 🎨 Interactive features injected successfully");
    } catch (e) {
      _log("[CimaNow Bypass] ⚠️ Feature injection error:", e.message);
    }
  }

  function launchUI(data) {
    try {
      sessionStorage.setItem(_cacheKey, JSON.stringify(data));
    } catch (e) {}

    const media = extractMediaInfo();
    const totalLinks = Object.values(data).flat().length;
    const totalGroups = Object.keys(data).length;
    const allQualities = Object.values(data)
      .flat()
      .filter(function (i) {
        return i.quality;
      })
      .sort(function (a, b) {
        return parseInt(b.quality) - parseInt(a.quality);
      });
    const bestQuality = allQualities[0]?.quality || "N/A";
    const hasSE =
      media.type !== "movie" &&
      (media.season !== null || media.episode !== null);

    const typeLabels = {
      series: "مسلسل",
      movie: "فيلم",
      show: "برنامج",
      anime: "أنمي",
    };
    const typeIcons = {
      series:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>',
      movie:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      show: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      anime:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    };

    const groupsHTML = Object.entries(data)
      .map(function ([title, items], gi) {
        const qi = items
          .filter(function (i) {
            return i.quality;
          })
          .sort(function (a, b) {
            return getQM(b.quality).tier - getQM(a.quality).tier;
          });
        const oi = items.filter(function (i) {
          return !i.quality;
        });

        const qCards = qi
          .map(function (item, i) {
            const m = getQM(item.quality);
            const isBest = i === 0 && m.tier >= 3;
            return `<a href="${item.url}" target="_blank" rel="noopener" class="qc${isBest ? " qc-best" : ""}" style="--ac:${m.color};--ab:${m.bg};--abr:${m.border}" data-url="${item.url}" data-action="nav">
          ${isMobile ? "" : `<div class="qc-particles"></div><div class="qc-glow"></div><div class="qc-shine"></div>`}
          ${isBest && !isMobile ? '<div class="qc-crown"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 19h19v2h-19zM22.5 7l-4.5 5.5L12 4 5.5 12.5 1 7l3 12h16l3-12z"/></svg></div>' : ""}
          <div class="qc-emoji">${m.emoji}</div>
          <div class="qc-ico" style="background:${m.bg};border-color:${m.border}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${m.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
          <div class="qc-q">${m.label}</div>
          ${item.size ? '<div class="qc-sz">' + item.size + "</div>" : ""}
          ${m.tag ? '<div class="qc-tag" style="color:' + m.color + ";background:" + m.bg + ";border-color:" + m.border + '">' + m.tag + "</div>" : ""}
          <div class="qc-actions">
            <div class="qc-dl-btn" title="تحميل"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>
            <div class="qc-copy-btn" title="نسخ الرابط" data-action="copy" data-copy-url="${item.url}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></div>
          </div>
          ${isMobile ? "" : `<div class="qc-ripple"></div>`}
        </a>`;
          })
          .join("");

        const oCards = oi
          .map(function (item) {
            return `<a href="${item.url}" target="_blank" rel="noopener" class="ol" data-url="${item.url}">
          <div class="ol-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></div>
          <span>${item.name || "Download"}</span>
          <div class="ol-copy" data-action="copy" data-copy-url="${item.url}" title="نسخ"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></div>
        </a>`;
          })
          .join("");

        return `<div class="grp" style="--gi:${gi}">
        <div class="grp-h">
          <div class="grp-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg></div>
          <div class="grp-info">
            <div class="grp-title">${title}</div>
            <div class="grp-sub">${qi.length} جودات · ${items.length} روابط</div>
          </div>
          <div class="grp-cnt">${items.length}</div>
          <div class="grp-chevron"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
        </div>
        <div class="grp-body">
          ${qCards ? '<div class="qg">' + qCards + "</div>" : ""}
          ${oCards ? '<div class="og">' + oCards + "</div>" : ""}
        </div>
      </div>`;
      })
      .join("");

    const mobileFlag = isMobile ? "true" : "false";

    const particlesHTML = isMobile
      ? ""
      : Array.from({ length: 25 }, () => {
          const left = (Math.random() * 100).toFixed(1);
          const dur = (8 + Math.random() * 15).toFixed(1);
          const delay = (Math.random() * 10).toFixed(1);
          const size = (1 + Math.random() * 2).toFixed(1);
          const op = (0.05 + Math.random() * 0.15).toFixed(3);
          return (
            '<div class="particle" style="left:' +
            left +
            "%;animation-duration:" +
            dur +
            "s;animation-delay:" +
            delay +
            "s;width:" +
            size +
            "px;height:" +
            size +
            "px;opacity:" +
            op +
            '"></div>'
          );
        }).join("");

    const fullHTML =
      "<!DOCTYPE html>" +
      '<html lang="ar" dir="rtl">' +
      "<head>" +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5.0,user-scalable=yes">' +
      "<title>🦅 Ezio Bypass — تحميل مباشر</title>" +
      '<link rel="preconnect" href="https://fonts.googleapis.com">' +
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
      '<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">' +
      "<style>" +
      "*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}" +
      ":root{" +
      "--bg-primary:#030014;" +
      "--bg-card:rgba(15,15,40,.75);" +
      "--bg-card-hover:rgba(20,20,55,.85);" +
      "--glass:rgba(255,255,255,.03);" +
      "--glass-border:rgba(255,255,255,.06);" +
      "--glass-border-hover:rgba(255,255,255,.12);" +
      "--text-primary:#f0f0ff;" +
      "--text-secondary:rgba(255,255,255,.5);" +
      "--text-muted:rgba(255,255,255,.25);" +
      "--accent-1:#6366f1;" +
      "--accent-2:#8b5cf6;" +
      "--accent-3:#06b6d4;" +
      "--accent-4:#10b981;" +
      "--accent-5:#f59e0b;" +
      "--gold:#fbbf24;" +
      "--radius-sm:10px;--radius-md:16px;--radius-lg:24px;--radius-xl:32px;" +
      "--shadow-glow:0 0 80px -20px;" +
      '--font-ar:"Tajawal",sans-serif;' +
      '--font-en:"Inter","Tajawal",sans-serif;' +
      "}" +
      "html{scroll-behavior:smooth;font-size:16px}" +
      "body{" +
      "background:var(--bg-primary);color:var(--text-primary);" +
      "font-family:var(--font-ar);" +
      "min-height:100vh;min-height:100dvh;overflow-x:hidden;" +
      "-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;" +
      "line-height:1.6;" +
      "}" +
      "a{text-decoration:none;color:inherit;-webkit-tap-highlight-color:transparent}" +
      ".loader-screen{" +
      "position:fixed;inset:0;z-index:9999;" +
      "background:var(--bg-primary);" +
      "display:flex;flex-direction:column;align-items:center;justify-content:center;" +
      "animation:loaderOut .5s ease 1.2s forwards;" +
      "}" +
      "@keyframes loaderOut{to{opacity:0;visibility:hidden;pointer-events:none}}" +
      ".loader-screen.hidden{opacity:0;visibility:hidden;pointer-events:none;animation:none}" +
      ".loader-logo{" +
      "width:80px;height:80px;border-radius:24px;" +
      "background:linear-gradient(135deg,rgba(99,102,241,.2),rgba(139,92,246,.1));" +
      "border:1px solid rgba(99,102,241,.25);" +
      "display:flex;align-items:center;justify-content:center;" +
      "color:#a5b4fc;margin-bottom:28px;" +
      "animation:loaderPulse 2s ease infinite;" +
      "}" +
      "@keyframes loaderPulse{" +
      "0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(99,102,241,.3)}" +
      "50%{transform:scale(1.05);box-shadow:0 0 40px 10px rgba(99,102,241,.15)}" +
      "}" +
      ".loader-bar{width:200px;height:3px;border-radius:10px;background:rgba(255,255,255,.06);overflow:hidden;margin-bottom:16px}" +
      ".loader-fill{" +
      "height:100%;border-radius:10px;" +
      "background:linear-gradient(90deg,var(--accent-1),var(--accent-3),var(--accent-4));" +
      "background-size:200% 100%;" +
      "width:0;transition:width .3s;" +
      "animation:loaderSlide 1.5s ease infinite,loaderGrow 1s ease forwards;" +
      "}" +
      "@keyframes loaderGrow{to{width:100%}}" +
      "@keyframes loaderSlide{0%{background-position:200% 0}100%{background-position:-200% 0}}" +
      ".loader-text{font-size:12px;color:var(--text-muted);font-weight:600;letter-spacing:.1em}" +
      ".aurora{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}" +
      ".aurora-orb{" +
      "position:absolute;border-radius:50%;filter:blur(100px);" +
      "animation:auroraFloat 20s ease-in-out infinite alternate;" +
      "will-change:transform;" +
      "}" +
      ".aurora-orb:nth-child(1){width:600px;height:600px;top:-15%;left:-10%;background:radial-gradient(circle,rgba(99,102,241,.15),transparent 70%);animation-duration:25s}" +
      ".aurora-orb:nth-child(2){width:500px;height:500px;bottom:-10%;right:-10%;background:radial-gradient(circle,rgba(6,182,212,.1),transparent 70%);animation-duration:20s;animation-delay:-5s}" +
      ".aurora-orb:nth-child(3){width:400px;height:400px;top:40%;left:50%;transform:translateX(-50%);background:radial-gradient(circle,rgba(139,92,246,.08),transparent 70%);animation-duration:30s;animation-delay:-10s}" +
      ".aurora-orb:nth-child(4){width:350px;height:350px;top:10%;right:20%;background:radial-gradient(circle,rgba(16,185,129,.06),transparent 70%);animation-duration:22s;animation-delay:-8s}" +
      "@keyframes auroraFloat{" +
      "0%{transform:translate(0,0) scale(1) rotate(0deg)}" +
      "33%{transform:translate(30px,-40px) scale(1.1) rotate(5deg)}" +
      "66%{transform:translate(-20px,30px) scale(.95) rotate(-3deg)}" +
      "100%{transform:translate(15px,-15px) scale(1.05) rotate(2deg)}" +
      "}" +
      ".grid-overlay{" +
      "position:fixed;inset:0;z-index:0;pointer-events:none;" +
      "background-image:linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px);" +
      "background-size:80px 80px;" +
      "mask-image:radial-gradient(ellipse 70% 60% at 50% 50%,black,transparent);" +
      "-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 50%,black,transparent);" +
      "}" +
      ".particles{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}" +
      ".particle{position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(255,255,255,.15);animation:particleFloat linear infinite}" +
      "@keyframes particleFloat{0%{transform:translateY(100vh) translateX(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-10vh) translateX(50px);opacity:0}}" +
      ".page{" +
      "position:relative;z-index:2;max-width:960px;margin:0 auto;" +
      "padding:clamp(24px,5vw,52px) clamp(14px,3vw,32px) 80px;" +
      "opacity:0;transform:translateY(30px);" +
      "animation:pageReveal .8s cubic-bezier(.22,1,.36,1) 1.4s forwards;" +
      "}" +
      "@keyframes pageReveal{to{opacity:1;transform:translateY(0)}}" +
      ".page.visible{opacity:1!important;transform:translateY(0)!important;animation:none!important}" +
      ".hero{" +
      "display:flex;flex-direction:column;align-items:center;text-align:center;" +
      "margin-bottom:clamp(32px,6vw,56px);" +
      "animation:heroReveal 1s cubic-bezier(.22,1,.36,1) 1.6s both;" +
      "}" +
      "@keyframes heroReveal{from{opacity:0;transform:translateY(40px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}" +
      ".hero-status{" +
      "display:inline-flex;align-items:center;gap:10px;" +
      "background:linear-gradient(135deg,rgba(16,185,129,.12),rgba(6,182,212,.08));" +
      "border:1px solid rgba(16,185,129,.2);border-radius:100px;" +
      "padding:10px 24px;margin-bottom:24px;" +
      "font-size:11px;font-weight:700;color:#34d399;" +
      "letter-spacing:.1em;text-transform:uppercase;" +
      "backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);" +
      "box-shadow:0 4px 24px rgba(16,185,129,.08);" +
      "}" +
      ".status-dot{position:relative;width:8px;height:8px;border-radius:50%;background:#34d399}" +
      '.status-dot::after{content:"";position:absolute;inset:-3px;border-radius:50%;background:rgba(52,211,153,.3);animation:statusPing 2s ease infinite}' +
      "@keyframes statusPing{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.5);opacity:0}}" +
      ".hero-icon-wrap{position:relative;margin-bottom:20px}" +
      ".hero-icon{" +
      "width:72px;height:72px;border-radius:22px;" +
      "background:linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.08));" +
      "border:1px solid rgba(99,102,241,.2);" +
      "display:flex;align-items:center;justify-content:center;color:#a5b4fc;" +
      "transition:all .4s cubic-bezier(.22,1,.36,1);position:relative;z-index:1;" +
      "}" +
      '.hero-icon::before{content:"";position:absolute;inset:-1px;border-radius:22px;background:conic-gradient(from 180deg,transparent,rgba(99,102,241,.3),transparent);animation:iconSpin 4s linear infinite;opacity:0;transition:opacity .4s;z-index:-1}' +
      ".hero-icon:hover::before{opacity:1}" +
      ".hero-icon:hover{transform:scale(1.08) rotate(-5deg);box-shadow:0 12px 40px rgba(99,102,241,.2)}" +
      "@keyframes iconSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}" +
      ".hero-glow{position:absolute;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.12),transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);animation:heroGlowPulse 3s ease infinite;pointer-events:none}" +
      "@keyframes heroGlowPulse{0%,100%{opacity:.6;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}}" +
      ".hero-type{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;color:var(--accent-3);letter-spacing:.15em;text-transform:uppercase;margin-bottom:12px}" +
      ".hero h1{" +
      "font-size:clamp(26px,6vw,48px);font-weight:900;line-height:1.2;margin-bottom:8px;word-break:break-word;" +
      "background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,.7) 40%,rgba(167,139,250,.9) 100%);" +
      "-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;" +
      "}" +
      ".hero-meta{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:16px;margin-bottom:12px}" +
      ".chip{display:inline-flex;align-items:center;gap:6px;padding:7px 18px;border-radius:12px;font-size:12px;font-weight:800;color:#fff;line-height:1.3;transition:all .25s;position:relative;overflow:hidden}" +
      ".chip-s{background:linear-gradient(135deg,#6366f1,#4f46e5);box-shadow:0 4px 20px rgba(99,102,241,.35)}" +
      ".chip-e{background:linear-gradient(135deg,#06b6d4,#0891b2);box-shadow:0 4px 20px rgba(6,182,212,.35)}" +
      ".chip-t{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.25);color:#fbbf24}" +
      ".chip-y{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:var(--text-muted);font-weight:600;font-size:11px}" +
      ".hero-desc{font-size:clamp(13px,2vw,15px);color:var(--text-secondary);max-width:520px;line-height:1.9;margin-top:4px}" +
      ".stats{" +
      "display:grid;grid-template-columns:repeat(3,1fr);gap:14px;" +
      "margin-bottom:clamp(32px,5vw,52px);" +
      "animation:fadeUp .7s cubic-bezier(.22,1,.36,1) 1.8s both;" +
      "}" +
      ".stat{display:flex;align-items:center;gap:14px;padding:clamp(14px,2vw,20px) clamp(16px,2.5vw,24px);border-radius:var(--radius-md);background:var(--bg-card);border:1px solid var(--glass-border);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);transition:all .3s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden}" +
      '.stat::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)}' +
      ".stat:hover{transform:translateY(-4px);border-color:var(--glass-border-hover);box-shadow:0 16px 48px rgba(0,0,0,.3)}" +
      ".stat-ico{width:44px;height:44px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;position:relative}" +
      '.stat-ico::after{content:"";position:absolute;inset:0;border-radius:14px;background:inherit;filter:blur(12px);opacity:.4;z-index:-1}' +
      ".stat-body{display:flex;flex-direction:column}" +
      ".stat-v{font-size:clamp(20px,3vw,26px);font-weight:900;font-family:var(--font-en);line-height:1.1;letter-spacing:-.02em}" +
      ".stat-l{font-size:10px;color:var(--text-muted);margin-top:4px;font-weight:600;letter-spacing:.05em}" +
      ".grp{" +
      "background:var(--bg-card);border:1px solid var(--glass-border);border-radius:var(--radius-lg);" +
      "overflow:hidden;margin-bottom:20px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);" +
      "transition:all .4s cubic-bezier(.22,1,.36,1);" +
      "animation:grpReveal .6s cubic-bezier(.22,1,.36,1) calc(var(--gi,0) * 120ms + 2s) both;" +
      "position:relative;" +
      "}" +
      '.grp::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 10%,rgba(255,255,255,.06) 50%,transparent 90%)}' +
      "@keyframes grpReveal{from{opacity:0;transform:translateY(30px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}" +
      ".grp:hover{border-color:rgba(99,102,241,.18);box-shadow:0 20px 60px rgba(0,0,0,.25),0 0 0 1px rgba(99,102,241,.08);transform:translateY(-3px)}" +
      ".grp-h{display:flex;align-items:center;gap:14px;padding:clamp(18px,2.5vw,24px) clamp(20px,3vw,30px);border-bottom:1px solid rgba(255,255,255,.03);cursor:pointer;user-select:none;transition:background .2s}" +
      ".grp-h:hover{background:rgba(255,255,255,.015)}" +
      ".grp-ico{width:46px;height:46px;border-radius:14px;flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,.16),rgba(99,102,241,.04));border:1px solid rgba(99,102,241,.15);display:flex;align-items:center;justify-content:center;color:var(--accent-1);transition:all .3s}" +
      ".grp:hover .grp-ico{transform:scale(1.05);box-shadow:0 4px 16px rgba(99,102,241,.15)}" +
      ".grp-info{flex:1;min-width:0}" +
      ".grp-title{font-size:clamp(14px,2.2vw,17px);font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      ".grp-sub{font-size:10px;color:var(--text-muted);margin-top:2px;font-weight:500}" +
      ".grp-cnt{font-size:18px;font-weight:900;font-family:var(--font-en);color:var(--accent-1);min-width:32px;text-align:center;background:rgba(99,102,241,.08);padding:6px 12px;border-radius:10px;border:1px solid rgba(99,102,241,.12)}" +
      ".grp-chevron{color:var(--text-muted);transition:transform .3s;flex-shrink:0}" +
      ".grp-collapsed .grp-chevron{transform:rotate(-90deg)}" +
      ".grp-body{transition:max-height .4s cubic-bezier(.22,1,.36,1),opacity .3s;max-height:2000px;opacity:1;overflow:hidden}" +
      ".grp-collapsed .grp-body{max-height:0;opacity:0}" +
      ".qg{display:grid;grid-template-columns:repeat(auto-fill,minmax(clamp(110px,23vw,155px),1fr));gap:14px;padding:clamp(18px,2.5vw,24px) clamp(20px,3vw,30px)}" +
      ".qc{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding:clamp(20px,3vw,28px) clamp(14px,2vw,22px) clamp(16px,2vw,20px);border-radius:20px;background:linear-gradient(145deg,rgba(22,22,60,.95),rgba(15,15,45,.98));border:1px solid var(--abr,var(--glass-border));color:#fff;cursor:pointer;transition:all .3s cubic-bezier(.22,1,.36,1);-webkit-tap-highlight-color:transparent}" +
      ".qc:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 24px 64px rgba(0,0,0,.5),0 0 0 1px var(--ac),var(--shadow-glow) var(--ab);border-color:var(--ac)}" +
      ".qc:active{transform:translateY(-2px) scale(.98)}" +
      ".qc-particles{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 30% 20%,var(--ab),transparent 60%),radial-gradient(circle at 70% 80%,var(--ab),transparent 60%);opacity:0;transition:opacity .5s}" +
      ".qc:hover .qc-particles{opacity:.5}" +
      ".qc-glow{position:absolute;top:-60%;left:50%;transform:translateX(-50%);width:160%;height:120%;border-radius:50%;background:radial-gradient(ellipse,var(--ab),transparent 65%);opacity:0;transition:opacity .4s;pointer-events:none}" +
      ".qc:hover .qc-glow{opacity:1}" +
      ".qc-shine{position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.03),transparent);transition:none;pointer-events:none}" +
      ".qc:hover .qc-shine{animation:cardShine .8s ease}" +
      "@keyframes cardShine{from{left:-100%}to{left:200%}}" +
      ".qc-crown{position:absolute;top:-2px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#000;padding:4px 12px 6px;border-radius:0 0 10px 10px;font-size:9px;font-weight:900;box-shadow:0 4px 16px rgba(251,191,36,.3);display:flex;align-items:center;gap:4px}" +
      ".qc-best{background:linear-gradient(145deg,rgba(16,185,129,.12),rgba(22,22,56,.95));border-color:rgba(16,185,129,.35)}" +
      ".qc-best:hover{box-shadow:0 24px 64px rgba(16,185,129,.2),0 0 0 1px rgba(16,185,129,.5),0 0 80px -20px rgba(16,185,129,.15)}" +
      ".qc-emoji{font-size:20px;margin-bottom:6px;transition:transform .3s;filter:saturate(1.2)}" +
      ".qc:hover .qc-emoji{transform:scale(1.3) rotate(-10deg)}" +
      ".qc-ico{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;border:1.5px solid;margin-bottom:12px;transition:all .3s;position:relative}" +
      ".qc:hover .qc-ico{transform:scale(1.12);box-shadow:0 4px 20px var(--ab)}" +
      ".qc-q{font-size:clamp(22px,4vw,28px);font-weight:900;font-family:var(--font-en);letter-spacing:-.03em}" +
      ".qc-sz{font-size:10px;color:var(--text-muted);margin-top:6px;font-weight:500;font-family:var(--font-en)}" +
      ".qc-tag{font-size:9px;font-weight:800;letter-spacing:.14em;padding:4px 14px;border-radius:8px;border:1px solid;margin-top:12px}" +
      ".qc-actions{display:flex;gap:8px;margin-top:14px}" +
      ".qc-dl-btn,.qc-copy-btn{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:var(--text-muted);transition:all .25s}" +
      ".qc-dl-btn:hover{background:var(--ab);color:var(--ac);transform:scale(1.15);box-shadow:0 0 20px var(--ab)}" +
      ".qc-copy-btn:hover{background:rgba(255,255,255,.08);color:#fff;transform:scale(1.15)}" +
      ".qc-ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.1);transform:scale(0);pointer-events:none}" +
      ".og{display:flex;flex-wrap:wrap;gap:10px;padding:0 clamp(20px,3vw,30px) clamp(18px,2.5vw,24px)}" +
      ".qg+.og{padding-top:0}" +
      ".og:first-child{padding-top:clamp(18px,2.5vw,24px)}" +
      ".ol{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:14px;background:rgba(139,92,246,.06);border:1px solid rgba(139,92,246,.12);color:#a78bfa;font-size:12.5px;font-weight:600;transition:all .25s;min-height:48px;position:relative}" +
      ".ol:hover{background:rgba(139,92,246,.14);border-color:rgba(139,92,246,.3);transform:translateY(-3px);box-shadow:0 12px 32px rgba(139,92,246,.12)}" +
      ".ol-ico{width:28px;height:28px;border-radius:8px;background:rgba(139,92,246,.1);border:1px solid rgba(139,92,246,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}" +
      ".ol-copy{margin-right:auto;margin-left:4px;width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;color:var(--text-muted);flex-shrink:0}" +
      ".ol-copy:hover{background:rgba(139,92,246,.15);color:#a78bfa;transform:scale(1.1)}" +
      ".toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(100px);z-index:10000;display:flex;align-items:center;gap:12px;padding:14px 28px;border-radius:16px;background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.3);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);color:#34d399;font-size:13px;font-weight:700;box-shadow:0 16px 48px rgba(0,0,0,.4);transition:transform .4s cubic-bezier(.22,1,.36,1);pointer-events:none}" +
      ".toast.show{transform:translateX(-50%) translateY(0)}" +
      ".toast-ico{width:32px;height:32px;border-radius:10px;background:rgba(16,185,129,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}" +
      ".ft{" +
      "display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center;" +
      "margin-top:clamp(48px,7vw,72px);padding:clamp(32px,5vw,48px) clamp(20px,3vw,36px);" +
      "background:linear-gradient(180deg,transparent,rgba(10,10,30,.6) 30%,rgba(10,10,30,.8));" +
      "border-top:1px solid rgba(255,255,255,.04);position:relative;" +
      "animation:fadeUp .6s cubic-bezier(.22,1,.36,1) 2.4s both;" +
      "}" +
      '.ft::before{content:"";position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(167,139,250,.15),rgba(99,102,241,.2),rgba(167,139,250,.15),transparent)}' +
      ".ft-emblem{display:flex;align-items:center;gap:16px;width:100%;max-width:300px}" +
      ".ft-emblem-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(167,139,250,.2))}" +
      ".ft-emblem-line:last-child{background:linear-gradient(90deg,rgba(167,139,250,.2),transparent)}" +
      ".ft-emblem-icon{font-size:22px;filter:drop-shadow(0 0 12px rgba(167,139,250,.3));animation:emblemFloat 3s ease-in-out infinite}" +
      "@keyframes emblemFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}" +
      ".ft-brand{display:flex;align-items:center;gap:14px}" +
      ".ft-brand-icon{width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(139,92,246,.06));border:1px solid rgba(99,102,241,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .3s}" +
      ".ft-brand-icon:hover{transform:scale(1.1) rotate(-5deg);box-shadow:0 4px 20px rgba(99,102,241,.2)}" +
      ".ft-brand-text{display:flex;flex-direction:column;align-items:flex-start;gap:2px}" +
      ".ft-brand-name{font-size:16px;font-weight:900;background:linear-gradient(135deg,#e0e7ff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-.01em}" +
      ".ft-brand-creed{font-size:11px;font-weight:500;font-style:italic;color:rgba(167,139,250,.45);letter-spacing:.04em}" +
      ".ft-divider{width:80px;height:2px;border-radius:10px;background:linear-gradient(90deg,transparent,rgba(99,102,241,.25),rgba(139,92,246,.2),transparent)}" +
      ".ft-links{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}" +
      ".ft-link{display:inline-flex;align-items:center;gap:10px;padding:13px 26px;border-radius:16px;font-size:13px;font-weight:700;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.55);transition:all .35s cubic-bezier(.22,1,.36,1);min-height:50px;position:relative;overflow:hidden;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}" +
      '.ft-link::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .3s}' +
      ".ft-link:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,.3)}" +
      ".ft-link-github::before{background:linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))}" +
      ".ft-link-github:hover{border-color:rgba(255,255,255,.2);color:#fff;background:rgba(255,255,255,.08)}" +
      ".ft-link-github:hover::before{opacity:1}" +
      ".ft-link-github svg{transition:all .3s}" +
      ".ft-link-github:hover svg{transform:scale(1.15)}" +
      ".ft-link-telegram::before{background:linear-gradient(135deg,rgba(34,211,238,.06),rgba(6,182,212,.02))}" +
      ".ft-link-telegram:hover{border-color:rgba(34,211,238,.25);color:#67e8f9;background:rgba(34,211,238,.08)}" +
      ".ft-link-telegram:hover::before{opacity:1}" +
      ".ft-link-telegram svg{transition:all .3s;color:rgba(255,255,255,.4)}" +
      ".ft-link-telegram:hover svg{transform:scale(1.15);color:#22d3ee}" +
      ".ft-link span{position:relative;z-index:1}" +
      ".ft-bottom{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font-size:12px;font-weight:500}" +
      ".ft-copy-text{color:rgba(255,255,255,.22)}" +
      ".ft-copy-dot{color:rgba(255,255,255,.08);font-weight:300}" +
      ".ft-copy-heart{color:rgba(255,255,255,.22)}" +
      ".ft-heart{display:inline-block;animation:heartBeat 1.5s ease infinite;font-style:normal}" +
      "@keyframes heartBeat{0%,100%{transform:scale(1)}15%{transform:scale(1.25)}30%{transform:scale(1)}45%{transform:scale(1.15)}60%{transform:scale(1)}}" +
      ".ft-copy-year{color:rgba(167,139,250,.3);font-weight:700;font-family:var(--font-en)}" +
      ".ft-version{display:inline-flex;align-items:center;padding:5px 14px;border-radius:8px;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(99,102,241,.35);background:rgba(99,102,241,.04);border:1px solid rgba(99,102,241,.08)}" +
      "@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}" +
      "@media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}" +
      "::-webkit-scrollbar{width:5px}" +
      "::-webkit-scrollbar-track{background:transparent}" +
      "::-webkit-scrollbar-thumb{background:rgba(255,255,255,.05);border-radius:10px}" +
      "::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.1)}" +
      "html{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.05) transparent}" +
      "@media(max-width:520px){" +
      ".stats{grid-template-columns:1fr;gap:10px}" +
      ".qg{grid-template-columns:repeat(2,1fr);gap:10px}" +
      ".qc{padding:16px 12px 14px}" +
      ".qc-ico{width:38px;height:38px;border-radius:11px}" +
      ".qc-q{font-size:20px}" +
      ".qc-emoji{font-size:17px}" +
      ".stat{padding:12px 16px}" +
      ".stat-ico{width:38px;height:38px;border-radius:12px}" +
      ".grp-h{padding:16px 18px}" +
      ".qg,.og{padding-left:18px;padding-right:18px}" +
      ".hero-icon{width:60px;height:60px;border-radius:18px}" +
      ".hero-icon svg{width:22px;height:22px}" +
      ".ft-links{gap:8px}" +
      ".ft-link{padding:10px 16px;font-size:11px}" +
      ".page{padding-bottom:50px}" +
      ".hero-status{padding:8px 18px;font-size:10px}" +
      ".chip{padding:5px 13px;font-size:11px}" +
      ".qc-actions{gap:6px}" +
      ".qc-dl-btn,.qc-copy-btn{width:32px;height:32px}" +
      ".toast{padding:12px 20px;font-size:12px;border-radius:14px}" +
      ".ft{padding:28px 16px;gap:18px}" +
      ".ft-brand{flex-direction:column;align-items:center}" +
      ".ft-brand-text{align-items:center}" +
      ".ft-brand-name{font-size:15px}" +
      ".ft-brand-creed{font-size:10px;text-align:center}" +
      ".ft-bottom{font-size:11px;gap:6px}" +
      ".ft-emblem{max-width:220px}" +
      ".ft-emblem-icon{font-size:18px}" +
      "}" +
      "@media(min-width:521px) and (max-width:720px){" +
      ".stats{grid-template-columns:repeat(3,1fr)}" +
      ".qg{grid-template-columns:repeat(3,1fr)}" +
      "}" +
      "@media(min-width:721px){" +
      ".qg{grid-template-columns:repeat(4,1fr)}" +
      "}" +
      "@media(hover:none) and (pointer:coarse){" +
      ".qc:active{transform:scale(.96);transition-duration:.1s}" +
      ".grp:hover{transform:none}" +
      ".stat:hover{transform:none}" +
      ".ol:active{transform:scale(.97)}" +
      "}" +
      "@media(max-height:500px) and (orientation:landscape){" +
      ".page{padding-top:16px;padding-bottom:24px}" +
      ".hero{margin-bottom:20px}" +
      ".hero-icon{width:48px;height:48px}" +
      ".stats{margin-bottom:20px}" +
      "}" +
      "::selection{background:rgba(99,102,241,.35);color:#fff}" +
      "::-moz-selection{background:rgba(99,102,241,.35);color:#fff}" +
      "body.is-mobile .aurora,body.is-mobile .particles,body.is-mobile .grid-overlay{display:none!important}" +
      "body.is-mobile *,body.is-mobile *::before,body.is-mobile *::after{" +
      "animation-duration:0s!important;" +
      "animation-delay:0s!important;" +
      "transition-duration:0.05s!important;" +
      "transition-delay:0s!important;" +
      "backdrop-filter:none!important;" +
      "-webkit-backdrop-filter:none!important;" +
      "}" +
      "body.is-mobile .page{opacity:1!important;transform:none!important;animation:none!important}" +
      "body.is-mobile .hero{opacity:1!important;transform:none!important;animation:none!important}" +
      "body.is-mobile .stats{opacity:1!important;transform:none!important;animation:none!important}" +
      "body.is-mobile .grp{opacity:1!important;transform:none!important;animation:none!important}" +
      "body.is-mobile .ft{animation:none!important;opacity:1!important;transform:none!important}" +
      "body.is-mobile .loader-screen{display:none!important}" +
      "body.is-mobile .qc-particles,body.is-mobile .qc-glow,body.is-mobile .qc-shine,body.is-mobile .qc-ripple,body.is-mobile .hero-glow,body.is-mobile .hero-icon::before,body.is-mobile .status-dot::after,body.is-mobile .stat-ico::after,body.is-mobile .grp::before,body.is-mobile .stat::before,body.is-mobile .chip::before,body.is-mobile .ft::before{display:none!important}" +
      "body.is-mobile .qc:hover,body.is-mobile .grp:hover,body.is-mobile .stat:hover,body.is-mobile .ol:hover,body.is-mobile .ft-link:hover,body.is-mobile .chip:hover,body.is-mobile .hero-icon:hover{transform:none!important;box-shadow:none!important}" +
      "body.is-mobile .qc:hover .qc-emoji,body.is-mobile .qc:hover .qc-ico{transform:none!important}" +
      "body.is-mobile .grp-body{transition:none!important}" +
      "body.is-mobile .qc{background:rgba(22,22,60,.95)!important}" +
      "body.is-mobile .stat,body.is-mobile .grp{background:rgba(15,15,40,.9)!important}" +
      "body.is-mobile .hero-status,body.is-mobile .toast,body.is-mobile .ft-link{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}" +
      '.music-btn{' +
'position:fixed;bottom:20px;right:20px;z-index:9998;' +
'width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.1);' +
'background:rgba(15,15,40,.85);color:#a78bfa;' +
'display:flex;align-items:center;justify-content:center;' +
'cursor:pointer;transition:all .3s;' +
'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
'}' +
'.music-btn:hover{transform:scale(1.1);border-color:rgba(167,139,250,.3);box-shadow:0 0 20px rgba(167,139,250,.15)}' +
'.music-btn.playing{animation:musicPulse 1.5s ease infinite}' +
'@keyframes musicPulse{0%,100%{box-shadow:0 0 0 0 rgba(167,139,250,.3)}50%{box-shadow:0 0 0 8px rgba(167,139,250,0)}}' +
      "</style>" +
      "</head>" +
'<body class="' + (isMobile ? 'is-mobile' : '') + '">' +
'<audio id="bgMusic" loop preload="auto">' +
'<source src="https://files.catbox.moe/jydixl.mp3" type="audio/mpeg">' +
'</audio>' +
'<div class="music-btn" id="musicBtn" title="تشغيل/إيقاف الموسيقى">' +
'<svg id="musicIco" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' +
'</div>' +
'<div class="loader-screen" id="loader">' +
      '<div class="loader-logo">' +
      '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
      "</div>" +
      '<div class="loader-bar"><div class="loader-fill" id="loaderFill"></div></div>' +
      '<div class="loader-text">جارٍ تحضير الروابط...</div>' +
      "</div>" +
      (isMobile
        ? ""
        : '<div class="aurora"><div class="aurora-orb"></div><div class="aurora-orb"></div><div class="aurora-orb"></div><div class="aurora-orb"></div></div>' +
          '<div class="grid-overlay"></div>' +
          '<div class="particles" id="particles">' +
          particlesHTML +
          "</div>") +
      '<div class="toast" id="toast">' +
      '<div class="toast-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>' +
      '<span id="toastMsg">تم نسخ الرابط بنجاح!</span>' +
      "</div>" +
      '<div class="page" id="mainPage">' +
      '<div class="hero">' +
      '<div class="hero-status">' +
      '<span class="status-dot"></span>' +
      "CimaNow Bypass" +
      "</div>" +
      '<div class="hero-icon-wrap">' +
      (isMobile ? "" : '<div class="hero-glow"></div>') +
      '<div class="hero-icon">' +
      (typeIcons[media.type] || typeIcons.movie) +
      "</div>" +
      "</div>" +
      '<div class="hero-type">' +
      (typeLabels[media.type] || "محتوى") +
      "</div>" +
      "<h1>" +
      (media.title || "روابط التحميل المباشرة") +
      "</h1>" +
      (hasSE || media.trans || media.year
        ? '<div class="hero-meta">' +
          (hasSE && media.season !== null
            ? '<span class="chip chip-s">⚡ الموسم ' + media.season + "</span>"
            : "") +
          (hasSE && media.episode !== null
            ? '<span class="chip chip-e">🎬 الحلقة ' + media.episode + "</span>"
            : "") +
          (media.trans
            ? '<span class="chip chip-t">' + media.trans + "</span>"
            : "") +
          (media.year
            ? '<span class="chip chip-y">📅 ' + media.year + "</span>"
            : "") +
          "</div>"
        : "") +
      '<p class="hero-desc">تم استخراج جميع الروابط تلقائيًا بنجاح — اختر الجودة والسيرفر المناسب للتحميل المباشر</p>' +
      "</div>" +
      '<div class="stats">' +
      '<div class="stat">' +
      '<div class="stat-ico" style="background:rgba(99,102,241,.14);color:#818cf8">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>' +
      "</div>" +
      '<div class="stat-body">' +
      '<div class="stat-v" data-count="' +
      totalGroups +
      '">' +
      totalGroups +
      "</div>" +
      '<div class="stat-l">سيرفرات متاحة</div>' +
      "</div>" +
      "</div>" +
      '<div class="stat">' +
      '<div class="stat-ico" style="background:rgba(6,182,212,.14);color:#22d3ee">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>' +
      "</div>" +
      '<div class="stat-body">' +
      '<div class="stat-v" data-count="' +
      totalLinks +
      '">' +
      totalLinks +
      "</div>" +
      '<div class="stat-l">رابط تحميل</div>' +
      "</div>" +
      "</div>" +
      '<div class="stat">' +
      '<div class="stat-ico" style="background:rgba(16,185,129,.14);color:#34d399">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
      "</div>" +
      '<div class="stat-body">' +
      '<div class="stat-v">' +
      bestQuality +
      "</div>" +
      '<div class="stat-l">أفضل جودة</div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      groupsHTML +
      '<div class="ft">' +
      '<div class="ft-emblem">' +
      '<div class="ft-emblem-line"></div>' +
      '<div class="ft-emblem-icon">🦅</div>' +
      '<div class="ft-emblem-line"></div>' +
      "</div>" +
      '<div class="ft-brand">' +
      '<div class="ft-brand-icon">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#ftGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
      '<defs><linearGradient id="ftGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#a78bfa"/><stop offset="100%" stop-color="#6366f1"/></linearGradient></defs>' +
      "</svg>" +
      "</div>" +
      '<div class="ft-brand-text">' +
      '<span class="ft-brand-name">Ezio Auditore</span>' +
      '<span class="ft-brand-creed">Nothing Is True, Everything Is Permitted</span>' +
      "</div>" +
      "</div>" +
      '<div class="ft-divider"></div>' +
      '<div class="ft-links">' +
      '<a href="https://github.com/EzioTheGoat/EzioUserscripts" target="_blank" rel="noopener" class="ft-link ft-link-github">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>' +
      "<span>GitHub</span>" +
      "</a>" +
      '<a href="https://t.me/EzioTheGoatScripts" target="_blank" rel="noopener" class="ft-link ft-link-telegram">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' +
      "<span>Telegram</span>" +
      "</a>" +
      "</div>" +
      '<div class="ft-bottom">' +
      '<span class="ft-copy-text">مجاني ومفتوح المصدر</span>' +
      '<span class="ft-copy-dot">·</span>' +
      '<span class="ft-copy-heart">صنع بـ <span class="ft-heart">❤️</span></span>' +
      '<span class="ft-copy-dot">·</span>' +
      '<span class="ft-copy-year">' +
      new Date().getFullYear() +
      "</span>" +
      "</div>" +
      '<div class="ft-version">v2.0</div>' +
      "</div>" +
      "</div>" +
      "<script>" +
      "(function(){" +
      "function animateCounters(){" +
      'var counters=document.querySelectorAll(".stat-v[data-count]");' +
      "counters.forEach(function(el){" +
      'var target=parseInt(el.getAttribute("data-count"),10);' +
      "if(isNaN(target))return;" +
      "var duration=1500;" +
      "var startTime=null;" +
      'el.textContent="0";' +
      "function step(ts){" +
      "if(!startTime)startTime=ts;" +
      "var progress=Math.min((ts-startTime)/duration,1);" +
      "var eased=progress===1?1:1-Math.pow(2,-10*progress);" +
      "el.textContent=Math.floor(eased*target);" +
      "if(progress<1){requestAnimationFrame(step);}" +
      "else{el.textContent=target;}" +
      "}" +
      "requestAnimationFrame(step);" +
      "});" +
      "}" +
      'var isMob=document.body.classList.contains("is-mobile");' +
      "if(isMob){animateCounters();}" +
      "else{setTimeout(animateCounters,1800);}" +
      "})();" +
          'var music=document.getElementById("bgMusic");' +
'var musicBtn=document.getElementById("musicBtn");' +
'var isPlaying=false;' +
'music.volume=0.3;' +
'music.play().then(function(){' +
'isPlaying=true;' +
'musicBtn.classList.add("playing");' +
'}).catch(function(){isPlaying=false;});' +
'musicBtn.addEventListener("click",function(){' +
'if(isPlaying){music.pause();musicBtn.classList.remove("playing");isPlaying=false;}' +
'else{music.play();musicBtn.classList.add("playing");isPlaying=true;}' +
'});' +
      "<\/script>" +
      "</body>" +
      "</html>";

    try {
      const blob = new _Blob([fullHTML], { type: "text/html;charset=utf-8" });
      const blobURL = _createObjectURL(blob);
      _log("[CimaNow Bypass] ✅ Redirecting to blob URL...");
      location.replace(blobURL);
      _setTimeout(function () {
        if (document.getElementById("mainPage")) {
          injectInteractiveFeatures(isMobile);
        }
      }, 1500);
    } catch (e) {
      _log("[CimaNow Bypass] Blob failed, using document.write...");
      window.stop();
      document.open();
      document.write(fullHTML);
      document.close();
      _log("[CimaNow Bypass] ✅ UI rendered via document.write");
      _setTimeout(function () {
        injectInteractiveFeatures(isMobile);
      }, 100);
    }
  }

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
          " groups. Launching UI...",
      );
      _setTimeout(function () {
        launchUI(data);
      }, 0);
    }
  }

  if (extracted) return;

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
      _log("[CimaNow Bypass] 👁️ MutationObserver active — v1.9");
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

      const timeoutHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CimaNow Bypass — Timeout</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#030014;color:#f0f0ff;font-family:'Tajawal',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
body::before{content:"";position:fixed;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(239,68,68,.08),transparent 60%),radial-gradient(ellipse 80% 50% at 20% 80%,rgba(99,102,241,.06),transparent 50%)}
.tc{position:relative;z-index:2;text-align:center;max-width:480px;padding:48px 36px;background:rgba(15,15,40,.8);border:1px solid rgba(239,68,68,.15);border-radius:28px;backdrop-filter:blur(24px);animation:fi .6s ease both}
@keyframes fi{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.ti{width:72px;height:72px;border-radius:22px;margin:0 auto 24px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);display:flex;align-items:center;justify-content:center;color:#f87171}
.tc h2{font-size:24px;font-weight:900;margin-bottom:12px;background:linear-gradient(135deg,#fff,rgba(248,113,113,.8));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.tc p{font-size:14px;color:rgba(255,255,255,.4);line-height:1.8;margin-bottom:28px}
.ta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.tb{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;border:none;font-family:inherit;transition:all .3s;min-height:48px}
.tp{background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;box-shadow:0 8px 32px rgba(99,102,241,.3)}
.tp:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(99,102,241,.4)}
.ts{background:rgba(255,255,255,.04);color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.08)}
.ts:hover{background:rgba(255,255,255,.08);color:#fff;transform:translateY(-3px)}
.th{margin-top:20px;font-size:11px;color:rgba(255,255,255,.15)}
</style>
</head>
<body>
<div class="tc">
  <div class="ti">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  </div>
  <h2>انتهت المهلة الزمنية</h2>
  <p>لم يتم العثور على روابط التحميل خلال 30 ثانية. قد يكون المحتوى غير متاح أو أن الصفحة لم تحمّل بالكامل.</p>
  <div class="ta">
    <button class="tb tp" onclick="location.reload()">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
      إعادة المحاولة
    </button>
    <button class="tb ts" onclick="history.back()">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      رجوع
    </button>
  </div>
  <div class="th">Ezio Auditore — CimaNow Bypass v2.0</div>
</div>
</body>
</html>`;

      try {
        window.stop();
        document.open();
        document.write(timeoutHTML);
        document.close();
      } catch (e) {
        try {
          const blob = new _Blob([timeoutHTML], {
            type: "text/html;charset=utf-8",
          });
          location.replace(_createObjectURL(blob));
        } catch (e2) {}
      }
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
})();
