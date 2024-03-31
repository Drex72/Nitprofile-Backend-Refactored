"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computDateFromEpoch = exports.isDateExpired = exports.computeExpiryDate = exports.generateRandStr = void 0;
var crypto_1 = __importDefault(require("crypto"));
var generateRandStr = function (len) {
    return crypto_1.default.randomBytes(len / 2).toString("hex");
};
exports.generateRandStr = generateRandStr;
var computeExpiryDate = function (timeInSeconds) {
    return new Date(Date.now() + timeInSeconds * 1000);
};
exports.computeExpiryDate = computeExpiryDate;
var isDateExpired = function (date) {
    return date <= new Date(Date.now());
};
exports.isDateExpired = isDateExpired;
var computDateFromEpoch = function (epochTime) {
    return new Date(epochTime * 1000);
};
exports.computDateFromEpoch = computDateFromEpoch;
