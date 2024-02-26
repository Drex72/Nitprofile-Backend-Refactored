import { Router } from "express"
import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { updateProfilePicture } from "@/user/services"

export const userRouter = Router()

userRouter.put(
    "/update-pfp", 
    ControlBuilder.builder()
    .setHandler(updateProfilePicture.handle)
    .only("SUPER ADMIN", "USER")
    .isPrivate()
    .handle()
)


