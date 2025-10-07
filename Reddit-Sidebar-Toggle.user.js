// ==UserScript==
// @name         Reddit Sidebar Toggle
// @namespace    Violentmonkey Scripts
// @version      2.1
// @description  Toggle Reddit's sidebar with a button and remember the state across pages.
// @author       Ezio Auditore
// @icon         https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png
// @match        *://www.reddit.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/Reddit-Sidebar-Toggle.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/Reddit-Sidebar-Toggle.user.js
// ==/UserScript==

(function () {
    'use strict';

    // SVG icons for button
    const eyeIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    `;

    const eyeSlashIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.38 21.38 0 0 1 4.94-6.94"></path>
            <path d="M22 12c0 0-4-8-11-8a11.66 11.66 0 0 0-4 0"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    `;

    // Helper to find the sidebar (covers most Reddit layouts)
    function getSidebar() {
        return document.querySelector('[data-testid="left-sidebar"], .left-sidebar, [data-testid="sidebar"]');
    }

    // Toggle sidebar visibility and save state
    function toggleSidebarVisibility() {
        const sidebar = getSidebar();
        if (!sidebar) return;

        const currentState = localStorage.getItem('redditSidebarHidden') === 'true';
        const newState = !currentState;

        sidebar.style.display = newState ? 'none' : '';
        localStorage.setItem('redditSidebarHidden', newState.toString());

        const toggleButton = document.getElementById('redditSidebarToggleButton');
        if (toggleButton) {
            toggleButton.innerHTML = newState ? eyeSlashIcon : eyeIcon;
            toggleButton.setAttribute('title', newState ? 'Show Sidebar' : 'Hide Sidebar');
        }
    }

    // Inject toggle button into the Reddit header
    function injectToggleButton() {
        let headerContainer = document.querySelector('.items-center.flex.h-header-large');
        if (!headerContainer) headerContainer = document.querySelector('header');
        if (!headerContainer) headerContainer = document.body;

        if (document.getElementById('redditSidebarToggleButton')) return;

        const button = document.createElement('button');
        button.id = 'redditSidebarToggleButton';
        button.classList.add('ml-2', 'p-2', 'rounded');
        Object.assign(button.style, {
            cursor: 'pointer',
            marginLeft: '8px',
            zIndex: '1000',
            width: '36px',
            height: '36px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ff4500',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s',
        });

        button.innerHTML = eyeIcon;
        button.title = 'Hide Sidebar';
        button.addEventListener('click', toggleSidebarVisibility);

        headerContainer.appendChild(button);
    }

    // Apply initial visibility from localStorage
    function applyInitialState() {
        const sidebar = getSidebar();
        if (!sidebar) return;

        const isHidden = localStorage.getItem('redditSidebarHidden') === 'true';
        sidebar.style.display = isHidden ? 'none' : '';

        const toggleButton = document.getElementById('redditSidebarToggleButton');
        if (toggleButton) {
            toggleButton.innerHTML = isHidden ? eyeSlashIcon : eyeIcon;
            toggleButton.setAttribute('title', isHidden ? 'Show Sidebar' : 'Hide Sidebar');
        }
    }

    // Simple debounce helper
    function debounce(func, delay) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(func, delay);
        };
    }

    // Initialize once
    (function initialize() {
        injectToggleButton();
        applyInitialState();
    })();

    // Observe DOM for SPA navigation changes
    const observer = new MutationObserver(debounce(() => {
        injectToggleButton();
        applyInitialState();
    }, 300));

    observer.observe(document.body, { childList: true, subtree: true });
})();
