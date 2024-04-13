"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertArrayToObject = void 0;
const convertArrayToObject = (array) => {
    const result = {};
    array.forEach((item) => {
        const [key, value] = item.split("=");
        result[key] = value;
    });
    return result;
};
exports.convertArrayToObject = convertArrayToObject;
