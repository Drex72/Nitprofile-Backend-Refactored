import * as Joi from "joi"
import type { ValidationSchema } from "@/core"

export const signInSchema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().required().trim(),
    }),
}

export const forgotPasswordSchema: ValidationSchema = {
    inputSchema: Joi.object({
        email: Joi.string().required().trim(),
    }),
}

export const resetPasswordSchema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        resetToken: Joi.string().required().trim(),
    }),
}

export const inviteAdminSchema: ValidationSchema = {
    inputSchema: Joi.object({
        email: Joi.string().required().trim(),
    }),
}

export const acceptInvitationSchema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().email().required().trim(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        otherName: Joi.string().trim().optional(),
    }),

    querySchema: Joi.object({
        token: Joi.string().trim().required(),
    }),
}
