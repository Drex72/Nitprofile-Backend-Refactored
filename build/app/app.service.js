"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app_1 = require("@/app");
const core_1 = require("@/core");
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
