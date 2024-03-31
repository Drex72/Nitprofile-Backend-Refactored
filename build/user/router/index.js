"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
var controlBuilder_1 = require("@/core/middlewares/controlBuilder");
var services_1 = require("@/user/services");
var express_1 = require("express");
var schema_1 = require("./schema");
exports.profileRouter = (0, express_1.Router)();
exports.profileRouter.put("/update-pfp", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.updateProfilePicture.handle)
    .isPrivate()
    .handle());
exports.profileRouter.put("/update-profile", controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.updateprofileSchema)
    .setHandler(services_1.updateProfile.handle)
    .isPrivate()
    .handle());
