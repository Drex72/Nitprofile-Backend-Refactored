"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var express_1 = require("express");
var core_1 = require("@/core");
var auth_1 = require("@/auth");
var programs_1 = require("@/programs");
var user_1 = require("@/user");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use("/auth", auth_1.authRouter);
exports.appRouter.use("/programs", programs_1.programRouter);
exports.appRouter.use("/profile", user_1.profileRouter);
exports.appRouter.get("/health", function (_, res) {
    res.status(core_1.HttpStatus.OK).json({
        message: "Api up",
        version: "1.0",
    });
});
