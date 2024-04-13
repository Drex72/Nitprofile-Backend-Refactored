"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programRouter = void 0;
const controlBuilder_1 = require("@/core/middlewares/controlBuilder");
const admins_1 = require("@/programs/services/admins");
const core_1 = require("@/programs/services/core");
const profile_1 = require("@/programs/services/profile");
const program_nodes_1 = require("@/programs/services/program_nodes");
const users_1 = require("@/programs/services/users");
const express_1 = require("express");
const schema_1 = require("./schema");
const certificate_1 = require("../services/certificate");
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
    .setValidator(schema_1.findProgramSchema)
    .setHandler(core_1.deleteProgram.handle)
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
    .route("/user")
    .get(controlBuilder_1.ControlBuilder.builder()
    .setHandler(users_1.findProgramUsers.findUser)
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
    .route("/certificate")
    .post(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.addProgramCertificateFrameSchema)
    .setHandler(certificate_1.addProgramCertificateFrame.handle)
    .only("SUPER ADMIN", "ADMIN")
    .isPrivate()
    .handle())
    .get(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(certificate_1.generateCertificate.handle)
    .only("SUPER ADMIN", "USER")
    .isPrivate()
    .handle())
    .put(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(certificate_1.enableCertificateGeneration.handle)
    .only("SUPER ADMIN", "ADMIN")
    .isPrivate()
    .handle());
exports.programRouter
    .route("/certificate/preview")
    .get(controlBuilder_1.ControlBuilder.builder()
    .setValidator(schema_1.findProgramSchema)
    .setHandler(certificate_1.previewcertificate.handle)
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
