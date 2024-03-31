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
exports.getProgramNodesSchems = exports.createProgramNodeSchema = exports.addProgramProfileFrameSchema = exports.assignAdminToProgramSchema = exports.resendProgramUserMailSchema = exports.createProgramUserSchema = exports.updateProgramSchema = exports.findProgramSchema = exports.createProgramSchema = void 0;
var Joi = __importStar(require("joi"));
exports.createProgramSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().required().iso().min(Joi.ref("startDate")),
    }),
};
exports.findProgramSchema = {
    querySchema: Joi.object({
        programId: Joi.string().trim().optional(),
    }),
};
exports.updateProgramSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().optional(),
        startDate: Joi.date().iso().optional(),
        endDate: Joi.date().optional().iso().min(Joi.ref("startDate")),
    }),
    querySchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
    }),
};
exports.createProgramUserSchema = {
    inputSchema: Joi.object({
        user: Joi.object({
            email: Joi.string().email().required().trim(),
            firstName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
        }).optional(),
    }),
    querySchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
    }),
};
exports.resendProgramUserMailSchema = {
    inputSchema: Joi.object({
        email: Joi.string().trim().required(),
    }),
    querySchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
    }),
};
exports.assignAdminToProgramSchema = {
    inputSchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
        adminId: Joi.string().length(36).trim().required(),
    }),
};
exports.addProgramProfileFrameSchema = {
    inputSchema: Joi.object({
        profileFrameHeight: Joi.number().required(),
        profileFrameWidth: Joi.number().required(),
    }),
    querySchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
    }),
};
var baseNodeSchema = Joi.object({
    type: Joi.string().required(),
    x: Joi.number().required(),
    y: Joi.number().required(),
});
var imageNodeSchema = baseNodeSchema.keys({
    type: Joi.string().valid("image").required(),
    overlay: Joi.string().optional(),
    width: Joi.number().min(50).required(),
    height: Joi.number().min(50).required(),
    gravity: Joi.string().required(),
    radius: Joi.number().required(),
    crop: Joi.string().required(),
});
var textNodeSchema = baseNodeSchema.keys({
    type: Joi.string().valid("text").required(),
    font_family: Joi.string().required(),
    font_size: Joi.number().required(),
    font_weight: Joi.string().required(),
    color: Joi.string().required(),
    placeholder: Joi.boolean().optional(),
    text: Joi.alternatives().conditional("placeholder", {
        is: false,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
    }),
    entity: Joi.alternatives().conditional("placeholder", {
        is: true,
        then: Joi.string().valid("program", "date", "user").required(),
        otherwise: Joi.optional(),
    }),
    entity_key: Joi.alternatives().conditional("placeholder", {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
    }),
});
exports.createProgramNodeSchema = {
    inputSchema: Joi.object({
        nodes: Joi.array().required().min(1).items(Joi.alternatives().try(imageNodeSchema, textNodeSchema)),
        category: Joi.valid("profile", "certificate"),
    }),
    querySchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
    }),
};
exports.getProgramNodesSchems = {
    querySchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
        category: Joi.valid("profile", "certificate"),
    }),
};
