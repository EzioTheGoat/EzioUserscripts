// ==UserScript==
// @name         Bypass ArabSeed
// @namespace    Violentmonkey Scripts
// @version      2.3.5
// @description  Automatically bypass the countdown and show the download link
// @author       Ezio Auditore
// @icon         https://i.imgur.com/purcqbc.png
// @match        https://m.gameshop4u.com/*
// @match        https://m.gamehub.cam/*
// @match        https://adding.quest/*
// @match        https://zplay.gamezone.cam/*
// @match        https://gamestation.cam/*
// @match        https://gplay.gameplanet.cam/*
// @match        https://tplay.techplanet.cam/*
// @match        https://eplay2.gameplanet.cam/*
// @match        https://plg7.reviewpalace.net/*
// @match        https://tplay2.techplanet.cam/*
// @match        https://migration.cam/*
// @match        https://m.hegra.cam/*
// @match        https://m.regenzi.site/*
// @match        https://m.monafes.site/*
// @match        https://m.reviewpalace.net/*
// @match        https://m.techland.live/*
// @match        https://forgee.xyz/*
// @match        https://m.forgee.xyz/*
// @match        https://kalosha.site/*
// @match        https://reviewpalace.net/*
// @match        https://jurbana.site/*
// @match        https://hawsa.site/*
// @match        https://gamevault.cam/*
// @match        https://safary.site/*
// @match        https://logenzi.site/*
// @match        https://maftou7.site/*
// @match        https://mar3a.site/*
// @match        https://be7alat.site/*
// @match        https://mastaba.site/*
// @match        https://gamezone.cam/*
// @match        https://robou3.site/*
// @match        https://mar3a.site/*
// @match        https://dl4all.online/*
// @match        https://cheapou.site/*
// @match        https://hegry.site/*
// @match        https://playarena.cam/*
// @match       https://moshakes.site/*
// @match       https://joyarcade.cam/*
// @match       https://gameflare.cam/*
// @match       https://shallal.site/*
// @match       https://marcmello.site/*
// @match       https://mal3oub.site/*
// @match       https://shabory.site/*
// @match       https://marshoush.site/*
// @match       https://ka3boly.site/*
// @match       https://muhager.site/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-arabseed.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/bypass-arabseed.user.js
// ==/UserScript==

/**
 * Merged and Optimized Script for URL Normalization, Ad Blocking, and Download Button Modification
 *
 * This script performs the following tasks:
 * 1. Overrides window.open to block unwanted domains.
 * 2. Normalizes the current URL by appending domain‑specific parameters.
 * 3. Skips meta-refresh redirects.
 * 4. Hides countdown timers and reveals the primary download button.
 * 5. Observes dynamic DOM changes to block unwanted redirects and ads.
 * 6. Modifies the download button to directly redirect to MP4 files.
 *
 * The code is organized with professional inline comments and JSDoc-style blocks
 * for ease of understanding, extending, and updating.
 */

(function () {
  "use strict";

  // Log initialization with the current hostname.
  console.log("Script initialized on:", window.location.hostname);

  /*****************************************************
   * 1. Override window.open to Block Unwanted Domains *
   *****************************************************/
  const blockedDomainsForWindowOpen = [
    "videovils.click",
    "href.li",
    "aabroishere.website",
    "fulvideozrt.click", // Added from existing filters
  ];
  const originalWindowOpen = window.open;
  window.open = function (url, name, features) {
    try {
      const parsedUrl = new URL(url, window.location.href);
      if (
        blockedDomainsForWindowOpen.some((domain) =>
          parsedUrl.hostname.includes(domain)
        )
      ) {
        console.log("Blocked window.open call to:", url);
        return null;
      }
    } catch (e) {
      console.error("Error parsing URL in window.open override:", e);
    }
    return originalWindowOpen.call(window, url, name, features);
  };

  /*****************************************************
   * 2. Utility & Helper Functions                     *
   *****************************************************/

  /**
   * Placeholder for applying custom DOM filters.
   * Extend this function to add any custom filtering logic as needed.
   */
  function applyCustomFilters() {
    // TODO: Implement custom filtering logic if required.
  }

  /**
   * Normalizes the current URL by appending specific parameters based on the domain.
   *
   * It checks for conditions such as external download button links and applies
   * domain-specific modifications. If a redirection occurs, the function returns true.
   *
   * @returns {boolean} True if a redirection occurred, otherwise false.
   */
  function normalizeUrl() {
    const currentUrl = window.location.href;
    const hostname = window.location.hostname;
    const urlPattern = /\/category\/.+\?r=\d+$/; // Matches URLs like /category/... with trailing ?r=digits

    // Check if the download button (#btn) exists and its href points to an external file host.
    const downloadBtn = document.getElementById("btn");
    if (downloadBtn) {
      const externalHosts = [
        "turbobit.net",
        "up-4ever.net",
        "frdl.io",
        "filespayouts.com",
        "bigwarp.io",
        "nitroflare.com",
      ];
      if (externalHosts.some((host) => downloadBtn.href.includes(host))) {
        console.log(
          "Download button points to external file host; skipping URL normalization."
        );
        return false;
      }
    }

    // Define domain flags for internal handling.
    const isMonafesSite = hostname === "m.monafes.site";
    const isGamehubCam = hostname === "m.gamehub.cam";
    const isTechlandLive = hostname === "m.techland.live";
    const isReviewpalaceNet = hostname === "m.reviewpalace.net";
    const isForgeeXyz =
      hostname === "forgee.xyz" || hostname === "m.forgee.xyz";
    const isKaloshaSite = hostname === "kalosha.site";
    const isReviewpalaceNetDesktop = hostname === "reviewpalace.net";
    const isJurbanaSite = hostname === "jurbana.site";
    const isHawsaSite = hostname === "hawsa.site";
    const isGamevaultCam = hostname === "gamevault.cam";
    const isSafarySite = hostname === "safary.site";
    const isLogenziSite = hostname === "logenzi.site";
    const isMaftou7Site = hostname === "maftou7.site";
    const isMar3aSite = hostname === "mar3a.site";
    const isBe7alatSite = hostname === "be7alat.site";
    const isMastabaSite = hostname === "mastaba.site";
    const isGamezoneCam = hostname === "gamezone.cam";
    const isRobou3Site = hostname === "robou3.site";
    const isDl4allOnline = hostname === "dl4all.online";
    const isCheapouSite = hostname === "cheapou.site";
    const isHegrySite = hostname === "hegry.site";
    const isPlayarenaCam = hostname === "playarena.cam";
    const isMoshakesSite = hostname === "moshakes.site";
    const isJoyarcadeCam = hostname === "joyarcade.cam";
    const isGameflareCam = hostname === "gameflare.cam";
    const isShallalSite = hostname === "shallal.site";
    const isMarcmelloSite = hostname === "marcmello.site";
    const isMal3oubSite = hostname === "mal3oub.site";
    const isShaborySite = hostname === "shabory.site";
    const isMarshoushSite = hostname === "marshoush.site";
    const isKa3bolySite = hostname === "ka3boly.site";
    const isMuhagerSite = hostname === "muhager.site";

    // Special handling for Kalosha.site:
    // Append "gmz=1" if the URL contains "game=" but not "gmz=1" or "dgame=".
    if (isKaloshaSite) {
      const hasGameParam = currentUrl.includes("game=");
      const hasGmzParam = currentUrl.includes("gmz=1");
      const hasDgameParam = currentUrl.includes("dgame=");
      if (hasGameParam && !hasGmzParam && !hasDgameParam) {
        const separator = currentUrl.includes("?") ? "&" : "?";
        window.location.replace(currentUrl + separator + "gmz=1");
        return true;
      }
      return false;
    }

    // Special bypass for reviewpalace.net desktop version:
    // If URL ends with "pst=digits" and lacks "gmz=1", append "gmz=1".
    if (isReviewpalaceNetDesktop) {
      const pstRegex = /[?&]pst=\d+$/;
      if (pstRegex.test(currentUrl) && !/&gmz=1/.test(currentUrl)) {
        const separator = currentUrl.includes("?") ? "&" : "?";
        window.location.replace(currentUrl + separator + "gmz=1");
        return true;
      }
    }

    // Special handling for jurbana.site:
    // Append "gmz=1" if the URL ends with "game=digits" and doesn't already include it.
    if (isJurbanaSite) {
      const gameRegex = /[?&]game=\d+$/;
      if (gameRegex.test(currentUrl) && !currentUrl.includes("gmz=1")) {
        const separator = currentUrl.includes("?") ? "&" : "?";
        window.location.replace(currentUrl + separator + "gmz=1");
        return true;
      }
    }

    /**
     * List of domains that require bypassing the countdown by appending "?tfs=1" to the URL.
     * To update the list of domains, simply modify the array below.
     */
    const bypassDomains = [
      "hawsa.site",
      "gamevault.cam",
      "safary.site",
      "logenzi.site",
      "maftou7.site",
      "mar3a.site",
      "be7alat.site",
      "mastaba.site",
      "gamezone.cam",
      "robou3.site",
      "dl4all.online",
      "cheapou.site",
      "hegry.site",
      "playarena.cam",
      "moshakes.site",
      "joyarcade.cam",
      "gameflare.cam",
      "shallal.site",
      "marcmello.site",
      "mal3oub.site",
      "shabory.site",
      "marshoush.site",
      "ka3boly.site",
      "muhager.site",
    ];

    /**
     * Checks if the current URL on any of the specified domains requires bypassing the countdown.
     *
     * For domains listed in `bypassDomains`, if the query string contains "r=" and does not already include "tfs=1",
     * the function appends "&tfs=1" (or "?tfs=1" if no query parameters exist) to the URL and redirects the page.
     *
     * Example:
     *   Before: https://hawsa.site/single/1227/real-motocross/?r=479083485
     *   After:  https://hawsa.site/single/1227/real-motocross/?r=479083485&tfs=1
     *
     * @returns {boolean} Returns true if the URL was modified and a redirection was performed, otherwise false.
     */
    if (
      bypassDomains.includes(window.location.hostname) &&
      window.location.search.includes("r=") &&
      !window.location.search.includes("tfs=1")
    ) {
      const separator = window.location.href.includes("?") ? "&" : "?";
      window.location.replace(window.location.href + separator + "tfs=1");
      return true;
    }

    // Apply domain-specific normalization if the URL matches our bare pattern.
    if (urlPattern.test(currentUrl)) {
      if (isMonafesSite && !/&t=1&mon=1/.test(currentUrl)) {
        window.location.replace(`${currentUrl}&t=1&mon=1`);
        return true;
      } else if (isGamehubCam && !/&t=1&gfs=1&tfs=1/.test(currentUrl)) {
        window.location.replace(`${currentUrl}&t=1&gfs=1&tfs=1`);
        return true;
      } else if (isTechlandLive && !/&t=1&etu=1/.test(currentUrl)) {
        window.location.replace(`${currentUrl}&t=1&etu=1`);
        return true;
      } else if (isReviewpalaceNet && !/&t=1&tuh=1/.test(currentUrl)) {
        window.location.replace(`${currentUrl}&t=1&tuh=1`);
        return true;
      } else if (isForgeeXyz) {
        let updatedUrl = currentUrl;
        if (!/&mon=1/.test(currentUrl)) {
          updatedUrl += "&mon=1";
        }
        if (hostname === "m.forgee.xyz" && !/&monz=1/.test(currentUrl)) {
          updatedUrl += "&monz=1";
        }
        if (updatedUrl !== currentUrl) {
          window.location.replace(updatedUrl);
          return true;
        }
      } else if (!/&t=1/.test(currentUrl)) {
        window.location.replace(`${currentUrl}&t=1`);
        return true;
      }
    }
    return false;
  }

  /**
   * Detects and handles meta-refresh redirects by scanning for meta tags.
   * Useful for pages that use meta tags to trigger redirection.
   */
  function skipMetaRedirect() {
    try {
      const metaRefresh = document.querySelector('meta[http-equiv="Refresh"]');
      if (metaRefresh) {
        const content = metaRefresh.getAttribute("content");
        const redirectUrl = content.split("URL=")[1];
        if (redirectUrl) {
          console.log("Meta refresh detected. Redirecting to:", redirectUrl);
          window.location.replace(redirectUrl);
        }
      }
    } catch (error) {
      console.error("Error in skipMetaRedirect:", error);
    }
  }

  /**
   * Hides countdown timers and ensures the primary download button is visible.
   */
  function skipCountdownsAndButtons() {
    try {
      const countdown = document.getElementById("countdown");
      const downloadButton = document.getElementById("btn");
      if (countdown) {
        countdown.style.display = "none";
      }
      if (downloadButton) {
        downloadButton.style.display = "block";
      }
    } catch (error) {
      console.error("Error in skipCountdownsAndButtons:", error);
    }
  }

  /**
   * Observes dynamic DOM changes to reapply custom filters and block unwanted redirects.
   * It disables links that point to known ad/redirect domains.
   */
  function handleDynamicRedirectsAndAds() {
    const blockedDomainsForAds = [
      "fulvideozrt.click",
      "videovils.click",
      "another-ad-domain.com",
      "yet-another-ad-domain.com",
    ];

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" || mutation.type === "attributes") {
          // Reapply custom filters whenever new elements are added.
          applyCustomFilters();

          // Disable links pointing to blocked domains.
          const links = document.querySelectorAll("a");
          links.forEach((link) => {
            const href = link.getAttribute("href");
            if (
              href &&
              blockedDomainsForAds.some((domain) => href.includes(domain))
            ) {
              link.removeAttribute("href");
              console.log("Blocked redirect to:", href);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });
  }

  /*****************************************************
   * 3. Main Execution Flow                            *
   *****************************************************/

  /**
   * Main function to initialize the script after the page is fully loaded.
   *
   * This function:
   * - Normalizes the URL (exiting early if a redirection occurs).
   * - Skips meta-refresh redirects.
   * - Hides countdown timers and shows the download button.
   * - Sets up dynamic DOM observers to block ads/redirects.
   * - Modifies the download button to intercept click events and redirect directly to MP4 links.
   */
  function initScript() {
    // Normalize the URL. If a redirection occurs, halt further execution.
    if (normalizeUrl()) {
      return;
    }

    // Handle meta-refresh redirects if present.
    skipMetaRedirect();

    // Hide countdown timers and reveal the download button.
    skipCountdownsAndButtons();

    // For specific dynamic ad domains, set up observers.
    const dynamicAdDomains = ["asd.quest", "asd.rest", "asd.show"];
    if (dynamicAdDomains.includes(window.location.hostname)) {
      handleDynamicRedirectsAndAds();

      // Additional observer to reapply custom filters on DOM mutations.
      const filterObserver = new MutationObserver((mutations) => {
        mutations.forEach(() => applyCustomFilters());
      });
      filterObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    /*********************************************
     * 4. Download Button Modification            *
     *********************************************/
    // Attempt to locate the download button using multiple selectors.
    let downloadButton = document.querySelector(
      'a.download-button, button.download-button, a[href*="movie="]'
    );
    if (!downloadButton) {
      // Fallback: Search among all <a> and <button> elements for text containing "download".
      downloadButton = Array.from(document.querySelectorAll("a, button")).find(
        (el) => /download/i.test(el.textContent)
      );
    }
    if (downloadButton) {
      console.log("Download button found. Attaching click interceptor.");
      downloadButton.addEventListener(
        "click",
        function (e) {
          e.preventDefault();
          e.stopPropagation();

          // Attempt to locate an MP4 link (priority for exact match).
          let mp4Link = document.querySelector('a[href$=".mp4"]');
          if (!mp4Link) {
            const allMp4Links = document.querySelectorAll('a[href*=".mp4"]');
            if (allMp4Links.length > 0) {
              mp4Link = allMp4Links[0];
            }
          }

          // If an MP4 link is found, redirect to it; otherwise, try backup detection using a <video> element.
          if (mp4Link) {
            console.log("Redirecting to MP4:", mp4Link.href);
            window.location.href = mp4Link.href;
          } else {
            console.log("No MP4 link found. Initiating backup detection...");
            const videoElement = document.querySelector("video");
            if (videoElement && videoElement.src) {
              window.location.href = videoElement.src;
            }
          }
        },
        true
      );
    }
  }

  // Wait for the window to fully load before initializing the script.
  window.addEventListener("load", initScript);
})();
