"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptInvitationSchema = exports.inviteAdminSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyAccount = exports.signInSchema = void 0;
const Joi = __importStar(require("joi"));
exports.signInSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().email().required().trim(),
    }),
};
exports.verifyAccount = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        token: Joi.string().length(64).required().trim(),
    }),
};
exports.forgotPasswordSchema = {
    inputSchema: Joi.object({
        email: Joi.string().required().trim(),
    }),
};
exports.resetPasswordSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        resetToken: Joi.string().required().trim(),
    }),
};
exports.inviteAdminSchema = {
    inputSchema: Joi.object({
        email: Joi.string().email().required().trim(),
    }),
};
exports.acceptInvitationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        otherName: Joi.string().trim().optional(),
    }),
    querySchema: Joi.object({
        token: Joi.string().trim().required(),
    }),
};
