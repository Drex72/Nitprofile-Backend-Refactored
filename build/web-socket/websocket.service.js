"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketSecurityContext = exports.Websocket = void 0;
const socket_io_1 = require("socket.io");
const core_1 = require("@/core");
const WEBSOCKET_CORS = {
    origin: core_1.allowedOrigins,
    methods: ["GET", "POST"],
};
class Websocket extends socket_io_1.Server {
    constructor(httpServer) {
        super(httpServer, {
            cors: WEBSOCKET_CORS,
        });
    }
    static getInstance(httpServer) {
        if (!Websocket.io && httpServer) {
            Websocket.io = new Websocket(httpServer);
            core_1.logger.info("Websocket Instance created successfully");
        }
        return Websocket.io;
    }
    initializeHandlers(socketHandlers) {
        socketHandlers.forEach((element) => {
            let namespace = Websocket.io.of(`/${element.path}`, (socket) => {
                element.handler.handleConnection(socket);
            });
            if (element.handler.middlewareImplementation) {
                namespace.use(element.handler.middlewareImplementation);
            }
        });
    }
}
exports.Websocket = Websocket;
class WebsocketSecurityContext {
    constructor() {
        this.verifySocketToken = (socket, callback) => {
            let token = socket.request;
            if (token === null || typeof token === "undefined") {
                return new core_1.UnAuthorizedError("Unauthorized (token not valid)");
            }
        };
    }
}
exports.WebsocketSecurityContext = WebsocketSecurityContext;
