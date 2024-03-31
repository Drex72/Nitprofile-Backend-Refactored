"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.allowedOrigins = void 0;
var getCurrentOrigin_1 = require("../utils/getCurrentOrigin");
exports.allowedOrigins = [getCurrentOrigin_1.currentOrigin];
var allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
var allowedHeaders = ["Content-Type", "Authorization"];
exports.corsOptions = {
    methods: allowedMethods,
    allowedHeaders: allowedHeaders,
    origin: exports.allowedOrigins,
    credentials: true,
};
