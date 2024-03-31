"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertArrayToObject = void 0;
var convertArrayToObject = function (array) {
    var result = {};
    array.forEach(function (item) {
        var _a = item.split("="), key = _a[0], value = _a[1];
        result[key] = value;
    });
    return result;
};
exports.convertArrayToObject = convertArrayToObject;
