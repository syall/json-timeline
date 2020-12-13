/**
 * @module sortAdvents
 */
const compareDates = require('../util/compareDates');

/**
 * @function
 * @name sortAdvents
 * @description Sort Advents by Start Date
 * @param {Object[]} advents Array of Advents
 * @returns {Object[]} Array of Sorted Advents
 */
function sortAdvents(advents) {
    return [...advents].sort((a1, a2) => compareDates(a1.start, a2.start));
}

module.exports = sortAdvents;
