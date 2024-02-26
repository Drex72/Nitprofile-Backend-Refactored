import { Router } from "express"
import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { addProgramProfileFrameSchema, assignAdminToProgramSchema, createProgramNodeSchema, createProgramSchema, createProgramUserSchema, findProgramSchema, updateProgramSchema } from "./schema"
import { createProgram ,deleteProgram,findPrograms,updateProgram,assignAdminToProgram, findProgramAssignedAdmins} from "../services"
import { findProgramUsers, registerProgramUsers } from "../services/users"
import { addProgramProfileFrame, generateProfile } from "../services/profile"
import { createProgramNodes } from "../services/program_nodes"
import { enableProfileGeneration } from "../services/profile/enable_profile_generation.service"

export const programRouter = Router()

// Create a program
programRouter
    .route("/")
    .get(
        ControlBuilder.builder()
        .setValidator(findProgramSchema)
        .setHandler(findPrograms.findAll)
        .isPrivate()
        .handle()
    )
    .post(
        ControlBuilder.builder()
        .setValidator(createProgramSchema)
        .setHandler(createProgram.handle)
        .only("ADMIN","SUPER ADMIN")
        .isPrivate()
        .handle()
    )
    .put(
        ControlBuilder.builder()
        .setValidator(updateProgramSchema)
        .setHandler(updateProgram.handle)
        .only("ADMIN","SUPER ADMIN")
        .isPrivate()
        .handle()
    )
    .delete(
        ControlBuilder.builder()
        .setValidator(createProgramSchema)
        .setHandler(createProgram.handle)
        .only("ADMIN","SUPER ADMIN")
        .isPrivate()
        .handle()
    )

programRouter
    .route("/users")
    .get(
        ControlBuilder.builder()
        .setValidator(findProgramSchema)
        .setHandler(findProgramUsers.handle)
        .isPrivate()
        .handle()
    )
    .post(
        ControlBuilder.builder()
        .setValidator(createProgramUserSchema)
        .setHandler(registerProgramUsers.handle)
        .only("ADMIN","SUPER ADMIN")
        .isPrivate()
        .handle()
    )


programRouter
    .route("/assign-admin")
    .get(
        ControlBuilder.builder()
        .setValidator(findProgramSchema)
        .setHandler(findProgramAssignedAdmins.handle)
        .only("SUPER ADMIN")
        .isPrivate()
        .handle()
    )
    .post(
        ControlBuilder.builder()
        .setValidator(assignAdminToProgramSchema)
        .setHandler(assignAdminToProgram.handle)
        .only("SUPER ADMIN")
        .isPrivate()
        .handle()
    )

programRouter
    .route("/profile")
    .post(
        ControlBuilder.builder()
        .setValidator(addProgramProfileFrameSchema)
        .setHandler(addProgramProfileFrame.handle)
        .only("SUPER ADMIN", "ADMIN")
        .isPrivate()
        .handle()
    )
    .get(
        ControlBuilder.builder()
        .setValidator(findProgramSchema)
        .setHandler(generateProfile.handle)
        .only("SUPER ADMIN", "USER")
        .isPrivate()
        .handle()
    )
    .put(
        ControlBuilder.builder()
        .setValidator(findProgramSchema)
        .setHandler(enableProfileGeneration.handle)
        .only("SUPER ADMIN", "ADMIN")
        .isPrivate()
        .handle()
    )


programRouter
    .route("/node")
    .post(
        ControlBuilder.builder()
        .setValidator(createProgramNodeSchema)
        .setHandler(createProgramNodes.handle)
        .only("SUPER ADMIN", "ADMIN")
        .isPrivate()
        .handle()
    )

// create program profile
// Update program profile
// create program certificate
// update program certificate