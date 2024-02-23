import { Router } from "express"
import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { assignAdminToProgramSchema, createProgramSchema, findProgramSchema, updateProgramSchema } from "./schema"
import { createProgram ,deleteProgram,findPrograms,updateProgram,assignAdminToProgram} from "../services"
import { findProgramUsers, registerProgramUsers } from "../services/users"

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
        .setValidator(createProgramSchema)
        .setHandler(registerProgramUsers.handle)
        .only("ADMIN","SUPER ADMIN")
        .isPrivate()
        .handle()
    )


programRouter
    .route("/assign-admin")
    .post(
        ControlBuilder.builder()
        .setValidator(assignAdminToProgramSchema)
        .setHandler(assignAdminToProgram.handle)
        .only("SUPER ADMIN")
        .isPrivate()
        .handle()
    )



// Get users for a program
// Register users for a program
// create program profile
// Update program profile
// create program certificate
// update program certificate