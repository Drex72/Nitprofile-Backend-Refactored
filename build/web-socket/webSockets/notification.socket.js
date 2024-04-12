"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSocket = void 0;
class NotificationSocket {
    handleConnection(socket) {
        const id = socket.data.id ?? undefined;
        socket.emit("ping", `Notification service for ${id} connected successfully`);
    }
    middlewareImplementation(socket, next) {
        const id = socket.handshake.auth.id;
        if (!id) {
            return next(new Error("Unauthorized connection"));
        }
        socket.data.id = id;
        return next();
    }
}
exports.NotificationSocket = NotificationSocket;
