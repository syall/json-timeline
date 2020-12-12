const compareDates = require('../util/compareDates');
const isType = require('../util/isType');

const monthDays = new Map([
    [1, (_) => 31],
    [2, (year) => year % 4 === 0 ? 29 : 28],
    [3, (_) => 31],
    [4, (_) => 30],
    [5, (_) => 31],
    [6, (_) => 30],
    [7, (_) => 31],
    [8, (_) => 31],
    [9, (_) => 30],
    [10, (_) => 31],
    [11, (_) => 30],
    [12, (_) => 31]
]);

function validateSchema(input) {

    if (!isType.isObject(input)) {
        return false;
    }

    const value = {};

    // start
    const start = validateDate(input.start);
    if (start) {
        value.start = start;
    } else {
        return false;
    }

    // end?
    const end = validateDate(input.end);
    if (end) {
        if (compareDates(start, end) <= 0) {
            value.end = end;
        } else {
            return false;
        }
    } else {
        value.end = null;
    }

    // title
    const title = input.title;
    if (isType.isString(title)) {
        value.title = title;
    } else {
        return false;
    }

    // content
    const content = input.content;
    if (isType.isString(content)) {
        value.content = content;
    } else {
        return false;
    }

    // tags
    const tags = validateTags(input.tags);
    if (tags) {
        value.tags = tags;
    } else {
        return false;
    }

    return value;
}

function validateDate(input) {

    if (!isType.isObject(input)) {
        return false;
    }

    const value = {};

    // Year
    if (isType.isNumber(input.year) &&
        (1 <= input.year)) {
        value.year = input.year;
    } else {
        return false;
    }

    // Month
    if (isType.isNumber(input.month) &&
        (1 <= input.month && input.month <= 12)) {
        value.month = input.month;
    } else {
        value.month = null;
    }

    // Day
    if (isType.isNumber(input.day)) {
        if (!isType.isNull(value.month) &&
            (1 <= input.day && input.day <= monthDays.get(value.month)(value.year))) {
            value.day = input.day;
        } else {
            return false;
        }
    } else {
        value.day = null;
    }

    // Fill out nulls
    if (value.month === null) {
        value.month = 1;
    }
    if (value.day === null) {
        value.day = 1;
    }

    return value;
}

function validateTags(input) {

    if (!Array.isArray(input)) {
        return false;
    }

    if (input.some(tag => !isType.isString(tag))) {
        return false;
    }

    return input;
}

module.exports = validateSchema;
