"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const mails_1 = require("@/mails");
const core_1 = require("@/core");
const listeners_1 = require("@/programs/listeners");
const listeners_2 = require("@/notifications/listeners");
/**
 * Event Listener Registry.
 */
exports.register = {
    "app:up": () => {
        core_1.logger.info(`Server started successfully on port ${core_1.config.port}`);
        core_1.config.appEnvironment !== "development" && console.log(`Server started successfully on port ${core_1.config.port}`);
        const memoryUsage = process.memoryUsage();
        // logger.info(`Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB`)
    },
    "cache:connection:established": () => core_1.logger.info(`Cache connection established`),
    "event:registeration:succesful": () => core_1.logger.info("Events listeners registered"),
    "event:sendMail": mails_1.sendEmail,
    "event:newNotification": listeners_2.createNotification.handle,
    "event:sendNewUserMail": listeners_1.sendNewUserMail.handle,
};
