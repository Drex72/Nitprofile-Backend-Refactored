"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var controlBuilder_1 = require("@/core/middlewares/controlBuilder");
var schema_1 = require("./schema");
var services_1 = require("../services");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/verify-account", controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.verifyAccount)
    .setHandler(services_1.verifyUserAccount.handle)
    .handle());
exports.authRouter.post("/sign-in", controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.signInSchema)
    .setHandler(services_1.signIn.handle)
    .handle());
exports.authRouter.post("/forgot-password", controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.forgotPasswordSchema)
    .setHandler(services_1.forgotPassword.handle)
    .handle());
exports.authRouter.post("/reset-password", controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.resetPasswordSchema)
    .setHandler(services_1.resetPassword.handle)
    .handle());
exports.authRouter.get("/refresh-token", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.refreshToken.handle)
    .handle());
exports.authRouter.post("/invite-admin", controlBuilder_1.ControlBuilder.builder()
    .isPrivate()
    .setValidator(schema_1.inviteAdminSchema)
    .setHandler(services_1.inviteAdmin.handle)
    .only("SUPER ADMIN")
    .handle());
exports.authRouter.post("/accept-admin-invite", controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.acceptInvitationSchema)
    .setHandler(services_1.acceptInvitation.handle)
    .handle());
exports.authRouter.post("/sign-out", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.signOut.handle)
    .isPrivate()
    .handle());
