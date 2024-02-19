import { Socket } from "socket.io"
import { MySocketInterface } from "@/web-socket/"
import { NextFunction } from "express"

export class NotificationSocket implements MySocketInterface {
    handleConnection(socket: Socket) {
        const id = socket.data.id ?? undefined

        socket.emit("ping", `Notification service for ${id} connected successfully`)
        
    }

    middlewareImplementation(socket: Socket, next: NextFunction) {
        const id = socket.handshake.auth.id

        if (!id) {
            return next(new Error("Unauthorized connection"))
        }

        socket.data.id = id

        return next()
    }
}
