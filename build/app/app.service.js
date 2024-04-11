"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var app_1 = require("../app");
var core_1 = require("../core");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
// app.use(globalRateLimiter)
exports.app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
exports.app.use((0, cors_1.default)(core_1.corsOptions));
exports.app.use(express_1.default.static("public"));
// app.use(compression())
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use("/api/v1", app_1.appRouter);
exports.app.use(core_1.notFoundHandler.handle);
exports.app.use(core_1.errorHandler.handle);
