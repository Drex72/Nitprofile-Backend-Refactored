"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programRouter = void 0;
var express_1 = require("express");
var controlBuilder_1 = require("@/core/middlewares/controlBuilder");
var schema_1 = require("./schema");
var core_1 = require("@/programs/services/core");
var admins_1 = require("@/programs/services/admins");
var profile_1 = require("@/programs/services/profile");
var program_nodes_1 = require("@/programs/services/program_nodes");
var users_1 = require("@/programs/services/users");
exports.programRouter = (0, express_1.Router)();
// Create a program
exports.programRouter
    .route("/")
    .get(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(core_1.findPrograms.findAll)
    .isPrivate()
    .handle())
    .post(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.createProgramSchema)
    .setHandler(core_1.createProgram.handle)
    .only("ADMIN", "SUPER ADMIN")
    .isPrivate()
    .handle())
    .put(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.updateProgramSchema)
    .setHandler(core_1.updateProgram.handle)
    .only("ADMIN", "SUPER ADMIN")
    .isPrivate()
    .handle())
    .delete(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.createProgramSchema)
    .setHandler(core_1.createProgram.handle)
    .only("ADMIN", "SUPER ADMIN")
    .isPrivate()
    .handle());
exports.programRouter.get("/metrics", controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(core_1.getProgramMetrics.handle)
    .only("ADMIN", "SUPER ADMIN")
    .isPrivate()
    .handle());
exports.programRouter
    .route("/users")
    .get(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(users_1.findProgramUsers.handle)
    .isPrivate()
    .handle())
    .post(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.createProgramUserSchema)
    .setHandler(users_1.registerProgramUsers.handle)
    .only("ADMIN", "SUPER ADMIN")
    .isPrivate()
    .handle())
    .put(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.resendProgramUserMailSchema)
    .setHandler(users_1.resendUserMail.handle)
    .only("ADMIN", "SUPER ADMIN")
    .isPrivate()
    .handle());
exports.programRouter
    .route("/assign-admin")
    .get(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(admins_1.findProgramAssignedAdmins.handle)
    .only("SUPER ADMIN")
    .isPrivate()
    .handle())
    .post(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.assignAdminToProgramSchema)
    .setHandler(admins_1.assignAdminToProgram.handle)
    .only("SUPER ADMIN")
    .isPrivate()
    .handle());
exports.programRouter
    .route("/profile")
    .post(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.addProgramProfileFrameSchema)
    .setHandler(profile_1.addProgramProfileFrame.handle)
    .only("SUPER ADMIN", "ADMIN")
    .isPrivate()
    .handle())
    .get(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(profile_1.generateProfile.handle)
    .only("SUPER ADMIN", "USER")
    .isPrivate()
    .handle())
    .put(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(profile_1.enableProfileGeneration.handle)
    .only("SUPER ADMIN", "ADMIN")
    .isPrivate()
    .handle());
exports.programRouter
    .route("/profile/preview")
    .get(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(profile_1.previewProfile.handle)
    .only("SUPER ADMIN", "ADMIN")
    .isPrivate()
    .handle());
exports.programRouter
    .route("/node")
    .post(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.createProgramNodeSchema)
    .setHandler(program_nodes_1.createProgramNodes.handle)
    .only("SUPER ADMIN", "ADMIN")
    .isPrivate()
    .handle())
    .get(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.getProgramNodesSchems)
    .setHandler(program_nodes_1.getProgramNodes.handle)
    .only("SUPER ADMIN", "ADMIN")
    .isPrivate()
    .handle());
