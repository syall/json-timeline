/**
 * Comparison Function for Dates
 * - Date 1 < Date 2 returns -1
 * - Date 1 = Date 2 returns 0
 * - Date 1 > Date 2 returns 1
 * @param {Object} date1 Date 1
 * @param {Object} date2 Date 2
 */
function compareDates(date1, date2) {
    /* Start Date */
    // Year
    if (date1.year < date2.year) {
        return -1;
    }
    if (date1.year > date2.year) {
        return 1;
    }
    // Month
    if (date1.month < date2.month) {
        return -1;
    }
    if (date1.month > date2.month) {
        return 1;
    }
    // Day
    if (date1.day < date2.day) {
        return -1;
    }
    if (date1.day > date2.day) {
        return 1;
    }
    // Equivalent
    return 0;
}

module.exports = compareDates;
