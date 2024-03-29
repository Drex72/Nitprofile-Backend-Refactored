import { Router } from "express"
import { HttpStatus, authRateLimiter } from "@/core"
import { authRouter } from "@/auth"
import { programRouter } from "@/programs"
import { userRouter } from "@/user"

export const appRouter = Router()

appRouter.use("/auth", authRouter)

appRouter.use("/programs", programRouter)

appRouter.use("/users", userRouter)

appRouter.get("/health", (_, res) => {
    res.status(HttpStatus.OK).json({
        message: "Api up",
        version: "1.0",
    })
})
