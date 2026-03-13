// ==UserScript==
// @name         Auto Picture-in-Picture on Tab Change
// @name:ar      التبديل التلقائي إلى وضع الصورة داخل الصورة (PiP)
// @namespace    https://github.com/EzioTheGoat/EzioUserscripts
// @version      2.3
// @description  Auto-enables PiP for playing videos in Chromium browsers on tab switch. Requires an initial click to unlock and exits on return.
// @description:ar  يُفعّل وضع الصورة داخل الصورة (PiP) تلقائيًا لمقاطع الفيديو في متصفحات Chromium عند التبديل بين علامات التبويب. يتطلب نقرة أولى لإلغاء القفل ويخرج عند الرجوع.
// @author       Ezio Auditore
// @license      MIT
// @icon         https://img.icons8.com/ios-filled/64/000000/picture-in-picture.png
// @match        *://*/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/527239/Auto%20Picture-in-Picture%20on%20Tab%20Change.user.js
// @updateURL https://update.greasyfork.org/scripts/527239/Auto%20Picture-in-Picture%20on%20Tab%20Change.meta.js
// ==/UserScript==

(function () {
  "use strict";

  const DEBUG = false;
  const PIP_DELAY = 120;

  function log(...msg) {
    if (DEBUG) console.log("[AutoPiP]", ...msg);
  }

  let videoDetected = false;
  let mediaSessionInjected = false;

  // ─── Video discovery (iframe + shadow DOM aware) ────────────────────────────

  function collectVideos(root) {
    const videos = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    let node = walker.currentNode;
    while (node) {
      if (node.tagName === "VIDEO") videos.push(node);
      if (node.shadowRoot) videos.push(...collectVideos(node.shadowRoot));
      node = walker.nextNode();
    }
    return videos;
  }

  function getAllVideos() {
    return collectVideos(document.body || document.documentElement);
  }

  function getBestVideo() {
    const videos = getAllVideos();
    if (!videos.length) return null;
    const inIframe = window.top !== window.self;
    let bestVideo = null;
    let maxScore = 0;

    for (const video of videos) {
      if (video.disablePictureInPicture) {
        try {
          video.disablePictureInPicture = false;
        } catch (e) {
          /* read-only on some */
        }
      }
      if (!inIframe) {
        if (video.offsetParent === null) continue;
        const rect = video.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const visible =
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;
        if (!visible) continue;
      }
      const rect = video.getBoundingClientRect();
      const area = rect.width * rect.height || 1;
      let score = area;
      if (!video.paused && !video.ended) score += area * 2;
      if (score > maxScore) {
        maxScore = score;
        bestVideo = video;
      }
    }
    return bestVideo || videos[0];
  }

  // ─── MediaSession injection ─────────────────────────────────────────────────
  function injectMediaSession(video) {
    if (!("mediaSession" in navigator)) return;
    if (mediaSessionInjected) return;

    const existing = navigator.mediaSession.metadata;
    if (!existing || !existing.title) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: document.title || "Video",
        artist: location.hostname,
      });
      log("MediaSession metadata injected");
    }

    navigator.mediaSession.playbackState = "playing";

    video.addEventListener("play", () => {
      navigator.mediaSession.playbackState = "playing";
    });
    video.addEventListener("pause", () => {
      navigator.mediaSession.playbackState = "paused";
    });
    video.addEventListener("ended", () => {
      navigator.mediaSession.playbackState = "none";
    });

    mediaSessionInjected = true;
    log("MediaSession playbackState set to playing");
  }

  // ─── PiP enter / exit ───────────────────────────────────────────────────────

  async function enterPiP() {
    const video = getBestVideo();
    if (!video) return;
    if (video.paused || video.ended || video.readyState < 3) return;
    if (document.pictureInPictureElement === video) return;
    try {
      await video.requestPictureInPicture();
      log("Entered PiP");
    } catch (e) {
      log("PiP failed (no gesture or flag not enabled)", e.message);
    }
  }

  async function exitPiP() {
    if (!document.pictureInPictureElement) return;
    try {
      await document.exitPictureInPicture();
      log("Exited PiP");
    } catch (e) {
      log("Exit PiP failed", e);
    }
  }

  // ─── Init ───────────────────────────────────────────────────────────────────

  function initEvents() {
    if (videoDetected) return;
    videoDetected = true;
    log("Video detected. Initializing PiP events.");

    function onVideoPlay(e) {
      injectMediaSession(e.target);
    }

    function attachPlayListeners() {
      for (const v of getAllVideos()) {
        v.removeEventListener("play", onVideoPlay);
        v.addEventListener("play", onVideoPlay);
        if (!v.paused && !v.ended) injectMediaSession(v);
      }
    }

    attachPlayListeners();

    const videoObs = new MutationObserver(attachPlayListeners);
    videoObs.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });

    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.setActionHandler(
          "enterpictureinpicture",
          async () => {
            log("MediaSession enterpictureinpicture triggered by Chrome");
            await enterPiP();
          },
        );
        log("MediaSession handler registered");
      } catch (e) {
        log("MediaSession enterpictureinpicture not supported", e);
      }
    }

    window.addEventListener("blur", () => setTimeout(enterPiP, PIP_DELAY));
    window.addEventListener("focus", () => setTimeout(exitPiP, PIP_DELAY));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) setTimeout(enterPiP, PIP_DELAY);
      else setTimeout(exitPiP, PIP_DELAY);
    });
  }

  // ─── Bootstrap ──────────────────────────────────────────────────────────────

  if (getAllVideos().length) {
    initEvents();
  } else {
    const obs = new MutationObserver(() => {
      if (getAllVideos().length) {
        initEvents();
        obs.disconnect();
        log("Observer stopped");
      }
    });
    obs.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });
  }
})();
