import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import compression from "compression"

import { corsOptions, notFoundHandler, errorHandler, compressionOptions, globalRateLimiter } from "@/core"
import { appRouter } from "@/app"

export const app = express()

app.use(express.json())

app.use(cookieParser())
// app.use(globalRateLimiter)

app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(compression())
app.use(express.urlencoded({ extended: false }))
app.use("/api/v1", appRouter)
app.use(
    fileUpload({
        useTempFiles: true,
    }),
)

app.use(notFoundHandler.handle)
app.use(errorHandler.handle)
