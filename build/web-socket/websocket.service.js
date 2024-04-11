"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketSecurityContext = exports.Websocket = void 0;
var socket_io_1 = require("socket.io");
var core_1 = require("../core");
var WEBSOCKET_CORS = {
    origin: core_1.allowedOrigins,
    methods: ["GET", "POST"],
};
var Websocket = /** @class */ (function (_super) {
    __extends(Websocket, _super);
    function Websocket(httpServer) {
        return _super.call(this, httpServer, {
            cors: WEBSOCKET_CORS,
        }) || this;
    }
    Websocket.getInstance = function (httpServer) {
        if (!Websocket.io && httpServer) {
            Websocket.io = new Websocket(httpServer);
            core_1.logger.info("Websocket Instance created successfully");
        }
        return Websocket.io;
    };
    Websocket.prototype.initializeHandlers = function (socketHandlers) {
        socketHandlers.forEach(function (element) {
            var namespace = Websocket.io.of("/".concat(element.path), function (socket) {
                element.handler.handleConnection(socket);
            });
            if (element.handler.middlewareImplementation) {
                namespace.use(element.handler.middlewareImplementation);
            }
        });
    };
    return Websocket;
}(socket_io_1.Server));
exports.Websocket = Websocket;
var WebsocketSecurityContext = /** @class */ (function () {
    function WebsocketSecurityContext() {
        this.verifySocketToken = function (socket, callback) {
            var token = socket.request;
            if (token === null || typeof token === "undefined") {
                return new core_1.UnAuthorizedError("Unauthorized (token not valid)");
            }
        };
    }
    return WebsocketSecurityContext;
}());
exports.WebsocketSecurityContext = WebsocketSecurityContext;
