/**
 * @module index
 */
import { renderTagToggles, renderTimeline } from './renderAdvents.js';

// IIFE renders Tag Toggles and Timeline
(() => {
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    renderTagToggles(nav, main);
    renderTimeline(main);
})();
