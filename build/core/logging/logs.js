"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDevLogger = exports.prodDevLogger = void 0;
var winston_1 = require("winston");
var combine = winston_1.format.combine, printf = winston_1.format.printf, timestamp = winston_1.format.timestamp, colorize = winston_1.format.colorize;
function logFormat() {
    return printf(function (info) {
        return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.stack || info.message);
    });
}
function prodDevLogger() {
    return (0, winston_1.createLogger)({
        format: combine(colorize(), timestamp(), logFormat()),
        transports: [
            new winston_1.transports.File({
                level: "info",
                filename: "src/appLogs/greenhurb-info.log",
            }),
            new winston_1.transports.File({
                level: "error",
                filename: "src/appLogs/greenhurb-error.log",
            }),
        ],
    });
}
exports.prodDevLogger = prodDevLogger;
function buildDevLogger() {
    return (0, winston_1.createLogger)({
        format: combine(colorize(), timestamp(), logFormat()),
        transports: [new winston_1.transports.Console()],
    });
}
exports.buildDevLogger = buildDevLogger;
