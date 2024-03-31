"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
var mails_1 = require("@/mails");
var core_1 = require("@/core");
var listeners_1 = require("@/programs/listeners");
var listeners_2 = require("@/notifications/listeners");
/**
 * Event Listener Registry.
 */
exports.register = {
    "app:up": function () {
        core_1.logger.info("Server started successfully on port ".concat(core_1.config.port));
        core_1.config.appEnvironment !== "development" && console.log("Server started successfully on port ".concat(core_1.config.port));
        var memoryUsage = process.memoryUsage();
        // logger.info(`Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB`)
    },
    "cache:connection:established": function () { return core_1.logger.info("Cache connection established"); },
    "event:registeration:succesful": function () { return core_1.logger.info("Events listeners registered"); },
    "event:sendMail": mails_1.sendEmail,
    "event:newNotification": listeners_2.createNotification.handle,
    "event:sendNewUserMail": listeners_1.sendNewUserMail.handle,
};
