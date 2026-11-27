// ==UserScript==
// @name        New script polybuzz.ai
// @namespace   Violentmonkey Scripts
// @icon        https://www.polybuzz.ai/favicon.png
// @version     1.0.0
//
// @match       https://www.polybuzz.ai/*
// @grant       none
//
// @author      -
// @description
// ==/UserScript==
// ==UserScript==
// @name         Auto Remove Age Verification Overlay
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically removes age verification dialog overlay
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const SELECTOR = '.el-overlay.age-estimation-dialog-cover';

    function removeOverlay() {
        const overlays = document.querySelectorAll(SELECTOR);
        let removed = false;
        overlays.forEach(el => {
            el.remove();
            removed = true;
        });

        // Also restore scrolling (Element Plus/MUI overlays lock body scroll)
        if (removed) {
            document.body.style.overflow = '';
            document.body.classList.remove('el-popup-parent--hidden');
            document.documentElement.style.overflow = '';
        }
    }

    // Remove on load
    removeOverlay();

    // Watch for the overlay being injected dynamically
    const observer = new MutationObserver(() => {
        removeOverlay();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Fallback in case DOM isn't ready yet
    window.addEventListener('DOMContentLoaded', removeOverlay);
})();
