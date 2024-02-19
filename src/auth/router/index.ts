import { Router } from "express"
import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { signInSchema } from "./schema"
import { signIn, signUp } from "../services"

export const authRouter = Router()


authRouter.post(
    "/admin/invite",
    ControlBuilder.builder()
    .isPrivate()
    .setValidator(signInSchema)
    .setHandler(signUp.adminSignup)
    .only("SUPER ADMIN")
    .handle(),
)
authRouter.post(
    "/admin/sign-up",
    ControlBuilder.builder()
    .isPrivate()
    .setValidator(signInSchema)
    .setHandler(signUp.adminSignup)
    .only("SUPER ADMIN")
    .handle(),
)
authRouter.post(
    "/sign-in", 
    ControlBuilder.builder()
    .setValidator(signInSchema)
    .setHandler(signIn.handle)
    .handle()
)
authRouter.post(
    "/sign-out", 
    ControlBuilder.builder()
    .setValidator(signInSchema)
    .setHandler(signIn.handle)
    .handle()
)

authRouter.post(
    "/refresh-token", 
    ControlBuilder.builder()
    .setValidator(signInSchema)
    .setHandler(signIn.handle)
    .handle()
)
authRouter.post(
    "/forgot-password", 
    ControlBuilder.builder()
    .setValidator(signInSchema)
    .setHandler(signIn.handle)
    .handle()
)

authRouter.post(
    "/reset-password", 
    ControlBuilder.builder()
    .setValidator(signInSchema)
    .setHandler(signIn.handle)
    .handle()
)