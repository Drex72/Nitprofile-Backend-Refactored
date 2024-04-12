"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = require("express");
const controlBuilder_1 = require("@/core/middlewares/controlBuilder");
const services_1 = require("@/notifications/services");
const schema_1 = require("./schema");
exports.notificationRouter = (0, express_1.Router)();
exports.notificationRouter.get("/health", (req, res) => {
    res.status(200).json({
        message: "Notification Service is up and running!",
        status: 200,
    });
});
exports.notificationRouter
    .route("/")
    .get(controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.findNotifications.handle)
    .setValidator(schema_1.notificationQuerySchema)
    .isPrivate()
    .handle())
    .patch(controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.updatenotifications.handle)
    .setValidator(schema_1.notificationQuerySchema)
    .isPrivate()
    .handle());
exports.notificationRouter
    .route("/entities")
    .post(controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.createNotificationEntity.handle)
    .setValidator(schema_1.createNotificationEntitySchema)
    .only("DEVELOPER")
    .isPrivate()
    .handle())
    .get(controlBuilder_1.ControlBuilder.builder().setHandler(services_1.findAllNotificationEntities.handle).isPrivate().only("DEVELOPER").handle())
    .delete(controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.deleteNotificationEntity.handle)
    .setValidator(schema_1.notificationEntityQuerySchema)
    .isPrivate()
    .only("DEVELOPER")
    .handle());
