const compareDates = require('../util/compareDates');

function sortAdvents(advents) {
    return [...advents].sort((a1, a2) => compareDates(a1.start, a2.start));
}

module.exports = sortAdvents;
