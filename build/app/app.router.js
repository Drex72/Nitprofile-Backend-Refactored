"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const core_1 = require("@/core");
const auth_1 = require("@/auth");
const programs_1 = require("@/programs");
const user_1 = require("@/user");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use("/auth", auth_1.authRouter);
exports.appRouter.use("/programs", programs_1.programRouter);
exports.appRouter.use("/profile", user_1.profileRouter);
exports.appRouter.get("/health", (_, res) => {
    res.status(core_1.HttpStatus.OK).json({
        message: "Api up",
        version: "1.0",
    });
});
