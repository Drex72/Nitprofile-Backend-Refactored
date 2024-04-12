"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationEntityQuerySchema = exports.createNotificationEntitySchema = exports.notificationQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.notificationQuerySchema = {
    querySchema: joi_1.default.object({
        notification_id: joi_1.default.string().optional(),
    }),
};
exports.createNotificationEntitySchema = {
    inputSchema: joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().optional(),
    }),
};
exports.notificationEntityQuerySchema = {
    querySchema: joi_1.default.object({
        entity_id: joi_1.default.string().optional(),
    }),
};
