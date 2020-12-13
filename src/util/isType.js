/**
 * @module isType
 */

/**
 * @function
 * @name isObject
 * @description Checks if the input is an object excluding null
 * @param {*} input Input Argument
 * @returns true if input is an object excluding null, false otherwise
 */
function isObject(input) {
    return input !== null && typeof input === 'object';
}

/**
 * @function
 * @name isNull
 * @description Checks if the input is null
 * @param {*} input Input Argument
 * @returns true if input is null, false otherwise
 */
function isNull(input) {
    return input === null;
}

/**
 * @function
 * @name isString
 * @description Checks if the input is a string
 * @param {*} input Input Argument
 * @returns true if input is a string, false otherwise
 */
function isString(input) {
    return typeof input === 'string';
}

/**
 * @function
 * @name isNumber
 * @description Checks if the input is a number
 * @param {*} input Input Argument
 * @returns true if input is a number, false otherwise
 */
function isNumber(input) {
    return typeof input === 'number';
}

module.exports = {
    isObject,
    isNull,
    isString,
    isNumber
};
