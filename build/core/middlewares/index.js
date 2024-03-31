"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieHandler = exports.notFoundHandler = exports.errorHandler = void 0;
var cookieHandler_1 = require("./cookieHandler");
var errorhandler_1 = require("./errorhandler");
var notFoundErrorHandler_1 = require("./notFoundErrorHandler");
exports.errorHandler = new errorhandler_1.ErrorHandler();
exports.notFoundHandler = new notFoundErrorHandler_1.NotFoundErrorHandler();
exports.cookieHandler = new cookieHandler_1.CookieHandler();
