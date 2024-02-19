import * as Joi from "joi"
import type { ValidationSchema } from "@/core"

export const signInSchema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().required().trim(),
    }),
}
