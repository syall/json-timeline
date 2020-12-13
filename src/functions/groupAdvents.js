/**
 * @module groupAdvents
 */
const compareDates = require('../util/compareDates');

/**
 * @function
 * @name groupAdvents
 * @description Group Advents by Start Date into Arrays
 * @param {Object[]} advents Array of Advents
 * @returns {Object[][]} Array of Arrays of Advents with the Same Start Date
 */
function groupAdvents(advents) {
    if (advents.length === 0) {
        return advents;
    }
    const groups = [[advents[0]]];
    for (let i = 1, group = 0; i < advents.length; i++) {
        if (compareDates(groups[group][0].start, advents[i].start) === 0) {
            groups[group].push(advents[i]);
        } else {
            groups.push([advents[i]]);
            group++;
        }
    }
    return groups;
}

module.exports = groupAdvents;
