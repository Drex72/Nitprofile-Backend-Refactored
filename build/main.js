"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const app_1 = require("@/app");
const core_1 = require("@/core");
(0, core_1.initializeDbConnection)().then(app_1.startApp).catch(core_1.gracefullyShutdown);
process.on("uncaughtException", (error) => {
    core_1.logger.info("Uncaught exception", error);
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    core_1.logger.info("Uncaught exception", error);
    process.exit(1);
});
