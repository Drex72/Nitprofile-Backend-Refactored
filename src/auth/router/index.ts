import { Router } from "express"
import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { signInSchema, acceptInvitationSchema, forgotPasswordSchema, inviteAdminSchema, resetPasswordSchema } from "./schema"
import { signIn, forgotPassword, resetPassword, refreshToken, acceptInvitation, inviteAdmin, signOut } from "../services"

export const authRouter = Router()

authRouter.post("/sign-in", ControlBuilder.builder().setValidator(signInSchema).setHandler(signIn.handle).handle())

authRouter.post("/forgot-password", ControlBuilder.builder().setValidator(forgotPasswordSchema).setHandler(forgotPassword.handle).handle())

authRouter.post("/reset-password", ControlBuilder.builder().setValidator(resetPasswordSchema).setHandler(resetPassword.handle).handle())

authRouter.post("/refresh-token", ControlBuilder.builder().isPrivate().setHandler(refreshToken.handle).handle())

authRouter.post(
    "/admin/invite",
    ControlBuilder.builder().isPrivate().setValidator(inviteAdminSchema).setHandler(inviteAdmin.handle).only("SUPER ADMIN").handle(),
)

authRouter.post(
    "/admin/accept-invite",
    ControlBuilder.builder().setValidator(acceptInvitationSchema).setHandler(acceptInvitation.handle).handle(),
)

authRouter.post("/sign-out", ControlBuilder.builder().setHandler(signOut.handle).handle())
