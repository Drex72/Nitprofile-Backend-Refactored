"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressionOptions = void 0;
const compression_1 = __importDefault(require("compression"));
exports.compressionOptions = {
    level: 1,
    threshold: 0,
    filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
            return false;
        }
        return compression_1.default.filter(req, res);
    },
};
