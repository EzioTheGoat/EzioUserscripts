// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Violentmonkey Scripts
// @version      2.2.7
// @description  Automatically Bypass all CimaNow Restrictions, Auto-click buttons, and Redirect to Watching Page
// @author       Ezio Auditore
// @icon         https://i.imgur.com/blh1X07.png
// @match        *://cimanow.cc/*
// @match        *://vip.cimanowinc.com/*
// @match        *://bs.cimanow.cc/*
// @match        *://*.cimanow.cc/*
// @match        *://*.cimanowinc.com/*
// @match        *://*.cimanow.online/*
// @match        https://rm.freex2line.online/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// ==/UserScript==

(function IIFE() {
  "use strict";

  // ██████╗ ██████╗  ██████╗ ██╗    ██╗███████╗██████╗  ██████╗
  // ██╔══██╗██╔══██╗██╔═══██╗██║    ██║██╔════╝██╔══██╗██╔════╝
  // ██████╔╝██████╔╝██║   ██║██║ █╗ ██║█████╗  ██████╔╝██║
  // ██╔══██╗██╔══██╗██║   ██║██║███╗██║██╔══╝  ██╔══██╗██║
  // ██████╔╝██║  ██║╚██████╔╝╚███╔███╔╝███████╗██║  ██║╚██████╗
  // ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝
  // Browser Fingerprint Configuration Section

  const COMMON_USER_AGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  Object.defineProperty(navigator, "userAgent", {
    get: () => COMMON_USER_AGENT,
    configurable: false,
    enumerable: false,
  });

  // ██╗  ██╗███████╗██╗   ██╗██╗ ██████╗███████╗███████╗
  // ██║ ██╔╝██╔════╝╚██╗ ██╔╝██║██╔════╝██╔════╝██╔════╝
  // █████╔╝ █████╗   ╚████╔╝ ██║██║     █████╗  ███████╗
  // ██╔═██╗ ██╔══╝    ╚██╔╝  ██║██║     ██╔══╝  ╚════██║
  // ██║  ██╗███████╗   ██║   ██║╚██████╗███████╗███████║
  // ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝╚══════╝
  // Core Business Logic Section

  function handleUrlRouting(url) {
    const { pathname: currentPath, href: originalUrl } = new URL(url);

    if (currentPath === "/") {
      window.location.replace("/home/");
      return;
    }

    const SAFE_PATHS = [
      "/home/",
      "/category/",
      "/selary/",
      "/recent/",
      "/الاحدث/",
      "/plans/",
      "/قريبا/",
      "/رمضان/",
      "/%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB/",
      "/%d8%a7%d9%84%d8%a7%d8%ad%d8%af%d8%ab/",
    ];

    const isProtectedRoute = SAFE_PATHS.some((path) =>
      currentPath.includes(path)
    );
    const hasWatchingSegment = /\/watching\/?$/i.test(originalUrl);

    if (isProtectedRoute || hasWatchingSegment) return;

    const pathSeparator = originalUrl.endsWith("/") ? "" : "/";
    //window.location.replace(`${originalUrl}${pathSeparator}watching/`);
  }

  // ███████╗███████╗ ██████╗ ██╗   ██╗██████╗ ██╗████████╗██╗   ██╗
  // ██╔════╝██╔════╝██╔═══██╗██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝
  // ███████╗█████╗  ██║   ██║██║   ██║██████╔╝██║   ██║    ╚████╔╝
  // ╚════██║██╔══╝  ██║   ██║██║   ██║██╔══██╗██║   ██║     ╚██╔╝
  // ███████║███████╗╚██████╔╝╚██████╔╝██║  ██║██║   ██║      ██║
  // ╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝
  // Security & Anti-Detection Section

  function deployAntiAdblock() {
    const stealthStyles = document.createElement("style");
    stealthStyles.id = "cimanow-anti-detection";
    stealthStyles.textContent = `
      cimanow.cc##+js(acs, Object.assign)
      cimanow.cc##+js(brave-fix)
      cimanow.cc##.popup:has(iframe)
    `;
    document.documentElement.prepend(stealthStyles);
  }

  function enableLazyLoadBlocking() {
    const currentPath = window.location.pathname;
    if (
      !(
        currentPath.startsWith("/selary/") || currentPath.includes("/watching/")
      )
    )
      return;

    console.log("[CIMA NOW] LazyLoad Blocker Activated:", window.location.href);

    const lazyLoadScriptIdentifier =
      "cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/17.8.3/lazyload.min.js";

    function blockLazyLoadScript(node) {
      if (
        node.tagName === "SCRIPT" &&
        node.src.includes(lazyLoadScriptIdentifier)
      ) {
        node.parentNode?.removeChild(node);
        console.log("[CIMA NOW] Blocked lazyload script:", node.src);
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) blockLazyLoadScript(node);
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    const originalCreateElement = Document.prototype.createElement;
    Document.prototype.createElement = function (tagName) {
      const element = originalCreateElement.call(this, tagName);
      if (tagName.toLowerCase() === "script") {
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function (name, value) {
          if (name === "src" && value.includes(lazyLoadScriptIdentifier)) {
            console.log("[CIMA NOW] Blocked lazyload script creation:", value);
            return;
          }
          return originalSetAttribute.call(this, name, value);
        };
      }
      return element;
    };
  }

  function maskBrave() {
    const createBraveMock = () =>
      new Proxy(
        {
          isBrave: {
            name: "isBrave",
            execute: () => Promise.resolve({ isBrave: false }),
          },
        },
        {
          get: (target, prop) =>
            prop in target ? target[prop] : () => Promise.resolve(),
        }
      );

    try {
      delete Navigator.prototype.brave;
    } catch (e) {}
    Object.defineProperty(Navigator.prototype, "brave", {
      get: () => createBraveMock(),
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

    window.addEventListener("error", (e) => e.stopImmediatePropagation());
    window.onerror = () => true;

    new MutationObserver(() => {
      try {
        delete Navigator.prototype.brave;
        Object.defineProperty(Navigator.prototype, "brave", {
          get: () => createBraveMock(),
          configurable: true,
          enumerable: false,
        });
      } catch (err) {}
    }).observe(document, { childList: true, subtree: true });
  }

  // █▀▀ █▀▀█ █▀▀█ █▀▀ █▀▀ 　 █▀▀ █░░█ █▀▀█ █▀▀ █▀▀ █▀▀
  // █░░ █▄▄▀ █▄▄█ ▀▀█ █▀▀ 　 █▀▀ █▄▄█ █▄▄█ ▀▀█ ▀▀█ ▀▀█
  // ▀▀▀ ▀░▀▀ ▀░░▀ ▀▀▀ ▀▀▀ 　 ▀░░ ▄▄▄█ ▀░░▀ ▀▀▀ ▀▀▀ ▀▀▀
  // Auto-Click & Timer Bypass Section

  function fakeCountdown360() {
    if (window.jQuery?.fn) {
      window.jQuery.fn.countdown360 = function (options) {
        console.log("[Fake countdown360] Activated with options:", options);
        return {
          start: () =>
            setTimeout(() => {
              const btn = document.querySelector("#downloadbtn");
              if (btn) {
                console.log(
                  "[Fake countdown360] Triggering download button click"
                );
                simulateClick(btn);
              }
            }, 200),
        };
      };
      console.log("[Fake countdown360] Plugin successfully mocked");
      return true;
    }
    return false;
  }

  function simulateClick(element) {
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus();

    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    const result = element.dispatchEvent(event);
    console.log(
      "[Auto-click] Dispatched click event:",
      element,
      "Success:",
      result
    );
  }

  function attemptAutoClick() {
    const targetElements = document.querySelectorAll(".btext");
    for (const el of targetElements) {
      if (el.textContent.trim() === "مشاهدة وتحميل") {
        simulateClick(el.parentElement);
        return true;
      }
    }
    return false;
  }

  function initializeAutoBypass() {
    const countdownCheck = setInterval(() => {
      if (fakeCountdown360()) clearInterval(countdownCheck);
    }, 50);

    const observer = new MutationObserver((mutations, obs) => {
      if (attemptAutoClick()) obs.disconnect();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("load", () => setTimeout(attemptAutoClick, 100));
  }

  // ██╗███╗   ██╗██╗████████╗██╗ █████╗ ██╗     ███████╗
  // ██║████╗  ██║██║╚══██╔══╝██║██╔══██╗██║     ██╔════╝
  // ██║██╔██╗ ██║██║   ██║   ██║███████║██║     █████╗
  // ██║██║╚██╗██║██║   ██║   ██║██╔══██║██║     ██╔══╝
  // ██║██║ ╚████║██║   ██║   ██║██║  ██║███████╗███████╗
  // ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝
  // Execution Bootstrap

  (function bootstrap() {
    try {
      handleUrlRouting(window.location.href);
      deployAntiAdblock();
      maskBrave();
      initializeAutoBypass();
    } catch (error) {
      console.error("[CIMA NOW+] Initialization Error:", error);
    }
  })();
})();
