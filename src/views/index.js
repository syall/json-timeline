import { renderTagToggles, renderTimeline } from './renderAdvents.js';

(() => {
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    renderTagToggles(nav, main);
    renderTimeline(main);
})();
