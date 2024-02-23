import * as Joi from "joi"
import type { ValidationSchema } from "@/core"

export const createProgramSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().required().iso().min(Joi.ref("startDate")),
    }),
}

export const findProgramSchema: ValidationSchema = {
    querySchema: Joi.object({
        programId: Joi.string().trim().optional(),
    }),
}

export const updateProgramSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().optional(),
        startDate: Joi.date().iso().optional(),
        endDate: Joi.date().optional().iso().min(Joi.ref("startDate")),
    }),

    querySchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
    }),
}

export const createProgramUserSchema: ValidationSchema = {
    inputSchema: Joi.object({
        programId: Joi.string().trim().optional(),
    }),

    querySchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
    }),
}

const schema = Joi.object({
    name: Joi.string().required(),
    month: Joi.string().required(),
    sex: Joi.allow(),
    salary: Joi.string().required(),
    registration_no: Joi.string().required(),
    designation: Joi.allow(),
})

export const assignAdminToProgramSchema: ValidationSchema = {
    inputSchema: Joi.object({
        programId: Joi.string().length(36).trim().required(),
        adminId: Joi.string().length(36).trim().required(),
    }),
}
