const compareDates = require('../util/compareDates');

function groupAdvents(advents) {
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
