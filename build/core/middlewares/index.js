"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const cookieHandler_1 = require("./cookieHandler");
const errorhandler_1 = require("./errorhandler");
const notFoundErrorHandler_1 = require("./notFoundErrorHandler");
exports.errorHandler = new errorhandler_1.ErrorHandler();
exports.notFoundHandler = new notFoundErrorHandler_1.NotFoundErrorHandler();
exports.cookieHandler = new cookieHandler_1.CookieHandler();
