const isType = {
    isObject: function (input) {
        return input !== null && typeof input === 'object';
    },
    isNull: function (input) {
        return input === null;
    },
    isString: function (input) {
        return typeof input === 'string';
    },
    isNumber: function (input) {
        return typeof input === 'number';
    }
};

module.exports = isType;
