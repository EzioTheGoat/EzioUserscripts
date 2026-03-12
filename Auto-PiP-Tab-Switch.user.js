// ==UserScript==
// @name         Auto Picture-in-Picture on Tab Change
// @namespace    https://github.com/EzioTheGoat/EzioUserscripts
// @version      2.1
// @description  Auto-enables PiP for playing videos in Chromium browsers on tab switch. Requires an initial click to unlock and exits on return.
// @author       Ezio Auditore
// @icon         https://img.icons8.com/ios-filled/64/000000/picture-in-picture.png
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/Auto-PiP-Tab-Switch.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/Auto-PiP-Tab-Switch.user.js
// ==/UserScript==

(function () {
"use strict";

const DEBUG = false;
const PIP_DELAY = 120;

function log(...msg) {
  if (DEBUG) console.log("[AutoPiP]", ...msg);
}

if (window.top !== window.self) return;
if (!document.pictureInPictureEnabled) return;

let unlocked = false;
let videoDetected = false;

["pointerdown", "keydown"].forEach(evt =>
  document.addEventListener(evt, () => {
    unlocked = true;
    log("User interaction detected");
  }, { once: true, capture: true })
);



function getBestVideo() {

  const videos = [...document.querySelectorAll("video")];
  if (!videos.length) return null;

  let bestVideo = null;
  let maxScore = 0;

  for (const video of videos) {

    if (video.offsetParent === null) continue;
    if (video.disablePictureInPicture) continue;

    const rect = video.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) continue;

    const visible =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0;

    if (!visible) continue;

    const area = rect.width * rect.height;

    let score = area;

    if (!video.paused && !video.ended) {
      score += area * 2;
    }

    if (score > maxScore) {
      maxScore = score;
      bestVideo = video;
    }

  }

  return bestVideo || videos[0];
}



async function enterPiP() {

  if (!unlocked) return;

  const video = getBestVideo();
  if (!video) return;

  if (video.paused || video.ended || video.readyState < 3) return;

  if (document.pictureInPictureElement === video) return;

  try {
    await video.requestPictureInPicture();
    log("Entered PiP");
  } catch (e) {
    log("PiP failed", e);
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



function initEvents() {

  if (videoDetected) return;

  videoDetected = true;
  log("Video detected. Initializing PiP events.");

  window.addEventListener("blur", () => {
    setTimeout(enterPiP, PIP_DELAY);
  });

  window.addEventListener("focus", () => {
    setTimeout(exitPiP, PIP_DELAY);
  });

  document.addEventListener("visibilitychange", () => {

    if (document.hidden) {
      setTimeout(enterPiP, PIP_DELAY);
    } else {
      setTimeout(exitPiP, PIP_DELAY);
    }

  });

}



const observer = new MutationObserver(() => {

  if (document.querySelector("video")) {
    initEvents();
    observer.disconnect();
    log("Observer stopped");
  }

});

observer.observe(document.body, {
  childList: true,
  subtree: true
});



if (document.querySelector("video")) {
  initEvents();
  observer.disconnect();
}

})();
