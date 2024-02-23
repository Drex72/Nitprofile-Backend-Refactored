import { Router } from "express"
import { HttpStatus, authRateLimiter } from "@/core"
import { authRouter } from "@/auth"
import { programRouter } from "@/programs"

export const appRouter = Router()

appRouter.use("/auth", authRouter)

appRouter.use("/programs", programRouter)

appRouter.get("/health", (_, res) => {
    res.status(HttpStatus.OK).json({
        message: "Api up",
        version: "1.0",
    })
})
