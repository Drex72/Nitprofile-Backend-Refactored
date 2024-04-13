"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const http_1 = require("http");
const web_socket_1 = require("@/web-socket");
const app_1 = require("@/app");
const core_1 = require("@/core");
const startApp = async () => {
    const server = (0, http_1.createServer)(app_1.app);
    const io = web_socket_1.Websocket.getInstance(server);
    io.initializeHandlers([{ path: web_socket_1.WEBSOCKET_CONSTANT.NOTIFICATION.NAMESPACE, handler: new web_socket_1.NotificationSocket() }]);
    server.listen(core_1.config.port, () => (0, app_1.dispatch)("app:up"));
};
exports.startApp = startApp;
