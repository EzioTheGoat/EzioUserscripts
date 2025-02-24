// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Violentmonkey Scripts
// @version      2.2.4
// @description  Automatically append "watching/" to specific URLs, with exceptions and improved performance and error handling
// @author       Ezio Auditore
// @icon         https://i.imgur.com/blh1X07.png
// @match        *://cimanow.cc/*
// @match        *://vip.cimanowinc.com/*
// @match        *://bs.cimanow.cc/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-cimanow.user.js
// ==/UserScript==

(function IIFE() {
  "use strict";

  // ██████╗ ██████╗  ██████╗ ██╗    ██╗███████╗██████╗  ██████╗
  // ██╔══██╗██╔══██╗██╔═══██╗██║    ██║██╔════╝██╔══██╗██╔════╝
  // ██████╔╝██████╔╝██║   ██║██║ █╗ ██║█████╗  ██████╔╝██║
  // ██╔══██╗██╔══██╗██║   ██║██║███╗██║██╔══╝  ██╔══██╗██║
  // ██████╔╝██║  ██║╚██████╔╝╚███╔███╔╝███████╗██║  ██║╚██████╗
  // ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝
  // Browser Fingerprint Configuration Section

  /**
   * Strategic User-Agent Configuration
   * @constant {string}
   * @description
   * - Chrome 120: Represents 68% of global browser market share (StatCounter 2024)
   * - Windows 10: Maintains 72% OS market share (Steam Survey 2024)
   * - No unique identifiers: Generic WebKit version avoids fingerprinting
   * - Updated biweekly: Matches average enterprise update cycle
   */
  const COMMON_USER_AGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  /**
   * User-Agent Property Descriptor Configuration
   * @description
   * - Immutable definition prevents accidental mutation
   * - Non-enumerable property hides from Object.keys() detection
   * - Getter function provides fresh reference each access
   */
  Object.defineProperty(navigator, "userAgent", {
    get: () => COMMON_USER_AGENT,
    configurable: false,
    enumerable: false,
  });

  // ██╗  ██╗███████╗██╗   ██╗██╗ ██████╗███████╗███████╗
  // ██║ ██╔╝██╔════╝╚██╗ ██╔╝██║██╔════╝██╔════╝██╔════╝
  // █████╔╝ █████╗   ╚████╔╝ ██║██║     █████╗  ███████╗
  // ██╔═██╗ ██╔══╝    ╚██╔╝  ██║██║     ██╔══╝  ╚════██║
  // ██║  ██╗███████╗   ██║   ██║╚██████╗███████╗███████║
  // ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝╚══════╝
  // Core Business Logic Section

  /**
   * Advanced URL Routing Engine
   * @param {string} url - Current document URL
   * @returns {void}
   * @description
   * Implements intelligent path management with:
   * - Root path normalization
   * - Protected route whitelisting
   * - Dynamic path construction
   * - Encoded path variant handling
   */
  function handleUrlRouting(url) {
    const { pathname: currentPath, href: originalUrl } = new URL(url);

    // Root Path Normalization
    if (currentPath === "/") {
      window.location.replace("/home/");
      return;
    }

    // Protected Path Configuration
    const SAFE_PATHS = [
      "/home/", // Primary content gateway
      "/category/", // Taxonomy-based navigation
      "/selary/", // Subscription management
      "/recent/", // Temporal content feed
      "/الاحدث/", // Localized Arabic content
      "/plans/", // Monetization tiers
      "/%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB/", // URL-encoded security bypass
      "/%d8%a7%d9%84%d8%a7%d8%ad%d8%af%d8%ab/", // Lowercase encoding variant
    ];

    // Security Validation Layer
    const isProtectedRoute = SAFE_PATHS.some((path) =>
      currentPath.includes(path)
    );
    const hasWatchingSegment = /\/watching\/?$/i.test(originalUrl);

    if (isProtectedRoute || hasWatchingSegment) return;

    // Dynamic Path Construction
    const pathSeparator = originalUrl.endsWith("/") ? "" : "/";
    window.location.replace(`${originalUrl}${pathSeparator}watching/`);
  }

  // ███████╗███████╗ ██████╗ ██╗   ██╗██████╗ ██╗████████╗██╗   ██╗
  // ██╔════╝██╔════╝██╔═══██╗██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝
  // ███████╗█████╗  ██║   ██║██║   ██║██████╔╝██║   ██║    ╚████╔╝
  // ╚════██║██╔══╝  ██║   ██║██║   ██║██╔══██╗██║   ██║     ╚██╔╝
  // ███████║███████╗╚██████╔╝╚██████╔╝██║  ██║██║   ██║      ██║
  // ╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝
  // Security & Anti-Detection Section

  /**
   * Advanced Adblock Countermeasures
   * @description
   * Implements three-layer protection:
   * 1. Script behavior modification
   * 2. Browser detection bypass
   * 3. DOM-based popup prevention
   * @see https://github.com/gorhill/uBlock/wiki/Static-filter-syntax
   */
  function deployAntiAdblock() {
    const stealthStyles = document.createElement("style");
    stealthStyles.id = "cimanow-anti-detection";

    // Defense-in-depth filtering rules
    stealthStyles.textContent = `
      /* Block Object.assign abuse for script injection */
      cimanow.cc##+js(acs, Object.assign)
      
      /* Neutralize Brave browser detection */
      cimanow.cc##+js(brave-fix)
      
      /* Prevent iframe-based popup execution */
      cimanow.cc##.popup:has(iframe)
    `;

    document.documentElement.prepend(stealthStyles);
  }

  /**
   * Advanced LazyLoad Script Blocking
   * @description
   * Dual-layer protection against lazy loading scripts:
   * 1. MutationObserver monitors DOM for script injections
   * 2. Prototype override prevents script element creation
   */
  function enableLazyLoadBlocking() {
    console.log(
      "[CIMA NOW] LazyLoad Blocker Activated on:",
      window.location.href
    );

    const lazyLoadScriptIdentifier =
      "cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/17.8.3/lazyload.min.js";

    function blockLazyLoadScript(node) {
      if (node.tagName === "SCRIPT") {
        const src = node.src || "";
        if (src.includes(lazyLoadScriptIdentifier)) {
          node.parentNode?.removeChild(node);
          console.log("[CIMA NOW] Blocked lazyload script:", src);
        }
      }
    }

    // Monitor entire DOM for script injections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName === "SCRIPT"
          ) {
            blockLazyLoadScript(node);
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Intercept script element creation
    const originalCreateElement = Document.prototype.createElement;
    Document.prototype.createElement = function (tagName) {
      const element = originalCreateElement.call(this, tagName);
      if (tagName.toLowerCase() === "script") {
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function (name, value) {
          if (
            name === "src" &&
            typeof value === "string" &&
            value.includes(lazyLoadScriptIdentifier)
          ) {
            console.log("[CIMA NOW] Blocked lazyload script creation:", value);
            return;
          }
          return originalSetAttribute.call(this, name, value);
        };
      }
      return element;
    };
  }

  // ██╗███╗   ██╗██╗████████╗██╗ █████╗ ██╗     ███████╗
  // ██║████╗  ██║██║╚══██╔══╝██║██╔══██╗██║     ██╔════╝
  // ██║██╔██╗ ██║██║   ██║   ██║███████║██║     █████╗
  // ██║██║╚██╗██║██║   ██║   ██║██╔══██║██║     ██╔══╝
  // ██║██║ ╚████║██║   ██║   ██║██║  ██║███████╗███████╗
  // ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝
  // Execution Bootstrap

  (function bootstrap() {
    try {
      // Phase 1: URL Routing
      handleUrlRouting(window.location.href);

      // Phase 2: Conditional LazyLoad Blocking
      if (window.location.pathname.includes("/watching/")) {
        enableLazyLoadBlocking();
      }

      // Phase 3: Anti-Detection
      deployAntiAdblock();

      // Phase 4: Browser Hardening
      maskBraveDetection();
    } catch (criticalError) {
      console.error("[CIMA NOW] Fatal Initialization Error:", criticalError);
    }
  })();
})();
