"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSocket = void 0;
var NotificationSocket = /** @class */ (function () {
    function NotificationSocket() {
    }
    NotificationSocket.prototype.handleConnection = function (socket) {
        var _a;
        var id = (_a = socket.data.id) !== null && _a !== void 0 ? _a : undefined;
        socket.emit("ping", "Notification service for ".concat(id, " connected successfully"));
    };
    NotificationSocket.prototype.middlewareImplementation = function (socket, next) {
        var id = socket.handshake.auth.id;
        if (!id) {
            return next(new Error("Unauthorized connection"));
        }
        socket.data.id = id;
        return next();
    };
    return NotificationSocket;
}());
exports.NotificationSocket = NotificationSocket;
