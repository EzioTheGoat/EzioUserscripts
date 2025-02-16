// ==UserScript==
// @name         Reddit Sidebar Toggle
// @namespace    Violentmonkey Scripts
// @version      1.0
// @description  A user script to toggle Reddit's sidebar with a button, and remember the state across pages.
// @author       Ezio Auditore
// @icon         https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png
// @match        *://www.reddit.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/Reddit-Sidebar-Toggle.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/Reddit-Sidebar-Toggle.user.js
// ==/UserScript==

(function () {
  "use strict";

  // ===== Configuration =====
  const EXPANDED_WIDTH = 270; // Sidebar width in expanded mode (px)
  const COLLAPSED_WIDTH = 0; // When collapsed, we hide it completely (display: none)
  const EXPANDED_BTN_LEFT = EXPANDED_WIDTH; // Position of the toggle button when expanded
  const COLLAPSED_BTN_LEFT = 0; // Position when collapsed
  const BTN_TOP_OFFSET = 100; // Vertical offset from top (px)
  const DEBOUNCE_DELAY = 300; // ms

  // ===== CSS Injection =====
  const css = `
    /* Expanded sidebar state */
    .rpl-sidebar-expanded {
      display: block !important;
      width: ${EXPANDED_WIDTH}px !important;
      position: relative !important;
      overflow: visible !important;
    }
    /* Collapsed sidebar state: completely hidden */
    .rpl-sidebar-collapsed {
      display: none !important;
    }
    /* Fixed container for the toggle button */
    #rpl-toggle-container {
      position: fixed;
      top: ${BTN_TOP_OFFSET}px;
      left: ${EXPANDED_BTN_LEFT}px;
      z-index: 10000;
      transition: left 0.3s ease;
    }
    /* Toggle button style */
    #rpl-toggle-button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #333;
      color: #ccc;
      border: 1px solid #555;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: color 0.2s, border-color 0.2s;
    }
    #rpl-toggle-button:hover {
      color: #ff4500;
      border-color: #ff4500;
    }
    /* Adjust container left position when sidebar is collapsed */
    .sidebar-collapsed-container {
      left: ${COLLAPSED_BTN_LEFT}px !important;
    }
    `;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ===== Persistence via localStorage =====
  const STORAGE_KEY = "rpl-sidebar-collapsed";
  function setCollapsedState(isCollapsed) {
    localStorage.setItem(STORAGE_KEY, isCollapsed ? "true" : "false");
  }
  function getCollapsedState() {
    return localStorage.getItem(STORAGE_KEY) === "true";
  }

  // ===== Utility: Debounce =====
  function debounce(fn, delay) {
    let timeoutID;
    return function (...args) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ===== Get the existing sidebar element =====
  function getSidebar() {
    // Try multiple selectors – update these as Reddit’s markup evolves.
    return (
      document.querySelector(
        ".border-r-neutral-border.s\\:border-r-sm.border-solid.border-0.m\\:block.hidden.order-first.isolate.theme-rpl.left-sidebar"
      ) ||
      document.getElementById("left-sidebar") ||
      document.querySelector(".flex-left-nav-container")
    );
  }

  // ===== Create fixed container for toggle button =====
  function createToggleContainer() {
    let container = document.getElementById("rpl-toggle-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "rpl-toggle-container";
      document.body.appendChild(container);
    }
    return container;
  }

  // ===== Create toggle button with SVG icons =====
  function createToggleButton() {
    let btn = document.getElementById("rpl-toggle-button");
    if (!btn) {
      btn = document.createElement("div");
      btn.id = "rpl-toggle-button";
      btn.addEventListener("click", toggleSidebar);
      const container = createToggleContainer();
      container.appendChild(btn);
    }
    return btn;
  }

  // ===== SVG Icons =====
  function getCollapseIconSVG() {
    // Material Design chevron left
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>`;
  }
  function getExpandIconSVG() {
    // Material Design menu icon (hamburger)
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>`;
  }

  // ===== Update toggle appearance =====
  function updateToggleAppearance(isCollapsed) {
    const btn = createToggleButton();
    const container = createToggleContainer();
    if (isCollapsed) {
      btn.innerHTML = getExpandIconSVG();
      btn.title = "Expand Sidebar";
      container.classList.add("sidebar-collapsed-container");
    } else {
      btn.innerHTML = getCollapseIconSVG();
      btn.title = "Collapse Sidebar";
      container.classList.remove("sidebar-collapsed-container");
    }
  }

  // ===== Toggle sidebar state =====
  function toggleSidebar() {
    const sidebar = getSidebar();
    if (!sidebar) return;
    const isCollapsed = sidebar.classList.contains("rpl-sidebar-collapsed");
    if (!isCollapsed) {
      sidebar.classList.remove("rpl-sidebar-expanded");
      sidebar.classList.add("rpl-sidebar-collapsed");
      setCollapsedState(true);
      updateToggleAppearance(true);
    } else {
      sidebar.classList.remove("rpl-sidebar-collapsed");
      sidebar.classList.add("rpl-sidebar-expanded");
      setCollapsedState(false);
      updateToggleAppearance(false);
    }
  }

  // ===== Apply stored state =====
  function applySidebarState(sidebar) {
    const isCollapsed = getCollapsedState();
    if (isCollapsed) {
      sidebar.classList.remove("rpl-sidebar-expanded");
      sidebar.classList.add("rpl-sidebar-collapsed");
    } else {
      sidebar.classList.remove("rpl-sidebar-collapsed");
      sidebar.classList.add("rpl-sidebar-expanded");
    }
    updateToggleAppearance(isCollapsed);
  }

  // ===== Initialization =====
  function init() {
    const sidebar = getSidebar();
    if (!sidebar) return;
    // Ensure sidebar container has relative positioning
    sidebar.style.position = "relative";
    // If no state is set, default to expanded
    if (
      !sidebar.classList.contains("rpl-sidebar-collapsed") &&
      !sidebar.classList.contains("rpl-sidebar-expanded")
    ) {
      sidebar.classList.add("rpl-sidebar-expanded");
    }
    applySidebarState(sidebar);
    createToggleContainer();
    createToggleButton();
  }

  // ===== Debounced observer for dynamic DOM changes =====
  const debouncedInit = debounce(init, DEBOUNCE_DELAY);
  const observer = new MutationObserver(debouncedInit);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("load", init);
})();
