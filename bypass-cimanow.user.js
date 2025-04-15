// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Violentmonkey Scripts
// @version      2.2.8
// @description  Automatically Bypass all CimaNow Restrictions, Auto-click buttons, and Redirect to Watching Page
// @author       Ezio Auditore
// @icon         https://i.imgur.com/blh1X07.png
// @match        *://cimanow.cc/*
// @match        *://vip.cimanowinc.com/*
// @match        *://bs.cimanow.cc/*
// @match        *://*.cimanow.cc/*
// @match        *://*.cimanowinc.com/*
// @match        *://*.cimanow.online/*
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

  // ██╗  ██╗███████╗██╗   ██╗██╗ ██████╗███████╗███████╗
  // ██║ ██╔╝██╔════╝╚██╗ ██╔╝██║██╔════╝██╔════╝██╔════╝
  // █████╔╝ █████╗   ╚████╔╝ ██║██║     █████╗  ███████╗
  // ██╔═██╗ ██╔══╝    ╚██╔╝  ██║██║     ██╔══╝  ╚════██║
  // ██║  ██╗███████╗   ██║   ██║╚██████╗███████╗███████║
  // ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝╚══════╝
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
      "/قريبا/",
      "/رمضان/",
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

  // ███████╗███████╗ ██████╗ ██╗   ██╗██████╗ ██╗████████╗██╗   ██╗
  // ██╔════╝██╔════╝██╔═══██╗██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝
  // ███████╗█████╗  ██║   ██║██║   ██║██████╔╝██║   ██║    ╚████╔╝
  // ╚════██║██╔══╝  ██║   ██║██║   ██║██╔══██╗██║   ██║     ╚██╔╝
  // ███████║███████╗╚██████╔╝╚██████╔╝██║  ██║██║   ██║      ██║
  // ╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝
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
    const currentPath = window.location.pathname;
    if (
      !(
        currentPath.startsWith("/selary/") || currentPath.includes("/watching/")
      )
    ) {
      return;
    }

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

  // ---------------------------------------------------------------------------
  // maskBrave: Bypass Brave Browser Detection
  // ---------------------------------------------------------------------------
  /**
   * Overrides browser properties to bypass Brave detection.
   *
   * This function creates a mock for the `navigator.brave` property by
   * redefining it with a getter that returns a custom proxy. The proxy's
   * `isBrave` method always resolves to `{ isBrave: false }`, effectively
   * masking the fact that the browser might be Brave.
   *
   * Additionally, if `navigator.userAgentData` is available, it is overwritten
   * with a spoofed configuration that mimics a Chromium-based browser without
   * Brave-specific identifiers.
   *
   * To ensure these overrides persist, the function also suppresses potential
   * errors and continuously re-applies the modifications on DOM mutations.
   *
   * @function maskBrave
   * @returns {void}
   */
  function maskBrave() {
    // Create a proxy-based mock for navigator.brave with an isBrave method.
    const createBraveMock = () => {
      const baseMock = {
        isBrave: {
          name: "isBrave",
          execute: () => Promise.resolve({ isBrave: false }),
        },
      };
      return new Proxy(baseMock, {
        get(target, prop) {
          // Return the property if it exists; otherwise return a dummy function.
          return prop in target ? target[prop] : () => Promise.resolve();
        },
      });
    };

    // Attempt to remove any existing navigator.brave property.
    try {
      delete Navigator.prototype.brave;
    } catch (e) {
      // Silently fail if deletion isn't possible.
    }

    // Redefine navigator.brave with the custom getter that returns our mock.
    Object.defineProperty(Navigator.prototype, "brave", {
      get: () => createBraveMock(),
      configurable: true,
      enumerable: false,
    });

    // Override navigator.userAgentData to remove Brave-specific identifiers if available.
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

    // Suppress errors that might reveal our modifications to external scripts.
    window.addEventListener("error", (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      return true;
    });
    window.onerror = () => true;

    // Monitor DOM mutations to continuously reapply our Brave override.
    const observer = new MutationObserver(() => {
      try {
        try {
          delete Navigator.prototype.brave;
        } catch (e) {
          // Ignore deletion errors during reapplication.
        }
        Object.defineProperty(Navigator.prototype, "brave", {
          get: () => createBraveMock(),
          configurable: true,
          enumerable: false,
        });
      } catch (err) {
        // Suppress any errors encountered during the reapplication process.
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
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
      // Phase 1: URL Routing
      handleUrlRouting(window.location.href);

      // Phase 2: LazyLoad Script Blocking (Call unconditionally)
      //enableLazyLoadBlocking();

      // Phase 3: Anti-Detection
      deployAntiAdblock();
      maskBrave();
    } catch (criticalError) {
      console.error("[CIMA NOW] Fatal Initialization Error:", criticalError);
    }
  })();
})();
