"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToUpperCaseWithUnderscore = void 0;
var convertToUpperCaseWithUnderscore = function (inputString) {
    // Split the input string into words
    var words = inputString.split(" ");
    // Capitalize each word and join them with underscores
    var formattedString = words.map(function (word) { return word.toUpperCase(); }).join("_");
    return formattedString;
};
exports.convertToUpperCaseWithUnderscore = convertToUpperCaseWithUnderscore;
