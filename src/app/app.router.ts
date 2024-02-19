import { Router } from "express"
import { HttpStatus, authRateLimiter } from "@/core"
import { authRouter } from "@/auth"

export const appRouter = Router()

appRouter.use("/auth", authRateLimiter, authRouter)

appRouter.get("/health", (_, res) => {
    res.status(HttpStatus.OK).json({
        message: "Api up",
        version: "1.0",
    })
})
