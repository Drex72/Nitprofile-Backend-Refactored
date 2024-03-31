"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRateLimiter = exports.globalRateLimiter = void 0;
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var moment_1 = __importDefault(require("moment"));
exports.globalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: (0, moment_1.default)().add(12, "hours").unix(), // 24 hrs in milliseconds
    max: 400,
    message: "You have exceeded the 100 requests in 24 hrs limit!",
    standardHeaders: true,
    legacyHeaders: false,
});
exports.authRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: (0, moment_1.default)().add(6, "hours").unix(), // 24 hrs in milliseconds
    max: 10,
    message: "You have exceeded the 10 requests in 24 hrs limit!",
    standardHeaders: true,
    legacyHeaders: false,
});