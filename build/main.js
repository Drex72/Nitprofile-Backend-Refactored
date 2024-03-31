"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var app_1 = require("@/app");
var core_1 = require("@/core");
(0, core_1.initializeDbConnection)().then(app_1.startApp).catch(core_1.gracefullyShutdown);
process.on("uncaughtException", function (error) {
    core_1.logger.info("Uncaught exception", error);
    process.exit(1);
});
process.on("unhandledRejection", function (error) {
    core_1.logger.info("Uncaught exception", error);
    process.exit(1);
});
