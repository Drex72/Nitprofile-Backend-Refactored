"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.allowedOrigins = void 0;
const getCurrentOrigin_1 = require("../utils/getCurrentOrigin");
exports.allowedOrigins = [getCurrentOrigin_1.currentOrigin];
const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const allowedHeaders = ["Content-Type", "Authorization"];
exports.corsOptions = {
    methods: allowedMethods,
    allowedHeaders,
    origin: exports.allowedOrigins,
    credentials: true,
};
