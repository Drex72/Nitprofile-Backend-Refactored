"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidate = exports.Joi = void 0;
// @ts-nocheck
var joi_1 = __importDefault(require("joi"));
exports.Joi = joi_1.default;
var joiValidate = function (schema, obj) {
    var _a = schema.validate(obj), error = _a.error, value = _a.value;
    if (error)
        throw error;
    return value;
};
exports.joiValidate = joiValidate;
