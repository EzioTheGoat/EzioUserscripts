// ==UserScript==
// @name         Bypass CimaNow
// @namespace    Violentmonkey Scripts
// @version      2.2.1
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

(function () {
  "use strict";

  /**
   * Custom User-Agent string to mimic an Opera browser on a Windows machine.
   */
  const newUserAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 OPR/109.0.0.0";

  /**
   * Overrides the default navigator.userAgent property to use a custom User-Agent string.
   */
  Object.defineProperty(navigator, "userAgent", {
    get: function () {
      return newUserAgent;
    },
  });

  /**
   * Masks Brave browser detection.
   * TODO: Implement a more robust solution to bypass Brave detection.
   */
  function maskBraveDetection() {}

  /**
   * Appends "watching/" to the URL if applicable, excluding predefined paths.
   * @param {string} url - The current page URL.
   */
  function appendWatching(url) {
    const exceptions = [
      "/home/",
      "/category/",
      "/selary/",
      "/recent/",
      "/الاحدث/",
      "/plans/",
      "/%D8%A7%D9%84%D8%A7%D8%AD%D8%AF%D9%8A%D8%AB/",
      "/%d8%a7%d9%84%d8%a7%d8%ad%d8%af%d8%ab/",
    ];

    const urlPath = new URL(url).pathname;
    const isException = exceptions.some((exception) =>
      urlPath.includes(exception)
    );

    if (
      urlPath === "/" || // Skip for homepage
      isException || // Skip for exceptions
      url.includes("/watching/") || // Skip if already appended
      url.endsWith("watching/")
    ) {
      return;
    }

    const newUrl = url.endsWith("/") ? `${url}watching/` : `${url}/watching/`;
    window.location.replace(newUrl);
  }

  /**
   * Injects Adblock-style JavaScript rules for additional bypass.
   */
  function injectAdblockRules() {
    const style = document.createElement("style");
    style.textContent = `
      cimanow.cc##+js(acs, Object.assign)
      cimanow.cc##+js(brave-fix)
    `;
    document.documentElement.appendChild(style);
  }

  /**
   * Executes the script to modify the User-Agent, mask browser fingerprinting, and inject bypass rules.
   */
  function init() {
    try {
      appendWatching(window.location.href); // Modify the URL
      injectAdblockRules(); // Add bypass rules
    } catch (error) {
      console.error("Error during script execution:", error);
    }
  }

  // Execute the script as early as possible
  init();
})();
