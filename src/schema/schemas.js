/**
 * @module schemas
 */

/**
 * @name AdventSchema
 * @description Schema of an Advent Object
 */
const AdventSchema = (
    {
        "start": DateSchema,
        "end?": DateSchema,
        "title": String,
        "content": String,
        "tags": Array.of(String)
    }
);

/**
 * @name DateSchema
 * @description Schema of a Date Object
 */
const DateSchema = (
    {
        "month": Number,
        "day": Number,
        "year": Number
    }
);

module.exports = {
    AdventSchema,
    DateSchema
};
