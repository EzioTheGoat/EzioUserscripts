// ==UserScript==
// @name         Reddit Sidebar Toggle
// @namespace    Violentmonkey Scripts
// @version      2.0
// @description  A user script to toggle Reddit's sidebar with a button, and remember the state across pages.
// @author       Ezio Auditore
// @icon         https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png
// @match        *://www.reddit.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/Reddit-Sidebar-Toggle.user.js
// @downloadURL  https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/Reddit-Sidebar-Toggle.user.js
// ==/UserScript==

/**
 * Reddit Sidebar Toggle Controller
 * 
 * This script provides persistent sidebar visibility control through:
 * - Local storage for state preservation
 * - Dynamic DOM injection of toggle button
 * - MutationObserver for SPA navigation handling
 * 
 * Performance Considerations:
 * - Debounced observer callback minimizes DOM interactions
 * - CSS class targeting avoids style recalculation triggers
 * - Single localStorage key usage reduces I/O overhead
 */
(function () {
    'use strict';

    // SVG icon definitions for visual feedback
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

    /**
     * Toggles sidebar visibility and updates persistent state
     * Strategy: 
     * - Direct style manipulation avoids class conflict with Reddit's code
     * - Synchronous localStorage update ensures state consistency
     */
    function toggleSidebarVisibility() {
        const sidebar = document.querySelector('.border-r-neutral-border.s\\:border-r-sm.border-solid.border-0.m\\:block.hidden.order-first.isolate.theme-rpl.left-sidebar');
        if (!sidebar) return;

        const currentState = localStorage.getItem('redditSidebarHidden') === 'true';
        const newState = !currentState;

        // State update pipeline
        sidebar.style.display = newState ? 'none' : '';
        localStorage.setItem('redditSidebarHidden', newState.toString());

        // UI feedback update
        const toggleButton = document.getElementById('redditSidebarToggleButton');
        if (toggleButton) {
            toggleButton.innerHTML = newState ? eyeSlashIcon : eyeIcon;
            toggleButton.setAttribute('title', newState ? 'Show Sidebar' : 'Hide Sidebar');
        }
    }

    /**
     * Injects control button into DOM
     * Hierarchy fallback strategy:
     * 1. Primary header container
     * 2. Generic <header> element
     * 3. Document body (fallback)
     * 
     * Safety Features:
     * - Duplicate button prevention
     * - Explicit style definitions for visual consistency
     */
    function injectToggleButton() {
        let headerContainer = document.querySelector('.items-center.flex.h-header-large');
        if (!headerContainer) headerContainer = document.querySelector('header');
        if (!headerContainer) headerContainer = document.body;

        if (document.getElementById('redditSidebarToggleButton')) return;

        const button = document.createElement('button');
        button.id = 'redditSidebarToggleButton';
        button.classList.add('ml-2', 'p-2', 'rounded', 'text-white', 'bg-reddit-orange', 
                          'hover:bg-reddit-dark-orange', 'focus:outline-none', 
                          'transition-colors', 'duration-300', 'relative');
        
        // Visual configuration
        Object.assign(button.style, {
            position: 'relative',
            cursor: 'pointer',
            marginLeft: '8px',
            zIndex: '1000',
            width: '36px',
            height: '36px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            fontSize: '18px'
        });

        button.innerHTML = eyeIcon;
        button.setAttribute('title', 'Hide Sidebar');
        button.addEventListener('click', toggleSidebarVisibility);
        headerContainer.appendChild(button);
    }

    /**
     * Applies initial visibility state from localStorage
     * Cold Start Handling:
     * - Default state (visible) when no stored value exists
     * - Synchronous execution prevents FOUC (Flash of Unstyled Content)
     */
    function applyInitialState() {
        const initialState = localStorage.getItem('redditSidebarHidden') === 'true';
        const sidebar = document.querySelector('.border-r-neutral-border.s\\:border-r-sm.border-solid.border-0.m\\:block.hidden.order-first.isolate.theme-rpl.left-sidebar');
        
        if (sidebar) {
            sidebar.style.display = initialState ? 'none' : '';
        }

        const toggleButton = document.getElementById('redditSidebarToggleButton');
        if (toggleButton) {
            toggleButton.innerHTML = initialState ? eyeSlashIcon : eyeIcon;
            toggleButton.setAttribute('title', initialState ? 'Show Sidebar' : 'Hide Sidebar');
        }
    }

    /**
     * Debounce implementation for performance-sensitive operations
     * @param {Function} func - Target function to debounce
     * @param {number} delay - Minimum time between executions (ms)
     * @returns {Function} Debounced function
     */
    function debounce(func, delay) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Initialization sequence
    (function initialize() {
        injectToggleButton();
        applyInitialState();
    })();

    /**
     * MutationObserver Configuration
     * Purpose: Handle Reddit's SPA navigation pattern
     * Observation Strategy:
     * - 300ms debounce compensates for Reddit's chunked DOM updates
     * - Full subtree observation required for cross-route persistence
     * 
     * Tradeoff Note:
     * Broad observer scope is necessary for reliable SPA handling,
     * but may impact performance on low-end devices
     */
    const debouncedUpdate = debounce(() => {
        injectToggleButton();
        applyInitialState();
    }, 300);

    const observer = new MutationObserver(debouncedUpdate);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
})();
