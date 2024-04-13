"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToUpperCaseWithUnderscore = void 0;
const convertToUpperCaseWithUnderscore = (inputString) => {
    // Split the input string into words
    const words = inputString.split(" ");
    // Capitalize each word and join them with underscores
    const formattedString = words.map((word) => word.toUpperCase()).join("_");
    return formattedString;
};
exports.convertToUpperCaseWithUnderscore = convertToUpperCaseWithUnderscore;
