"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const core_1 = require("@/core");
const models_1 = require("@/notifications/models");
const user_model_1 = require("@/auth/model/user.model");
const web_socket_1 = require("@/web-socket");
class CreateNotification {
    constructor(dbNotificationEntity, dbNotifications, dbUsers) {
        this.dbNotificationEntity = dbNotificationEntity;
        this.dbNotifications = dbNotifications;
        this.dbUsers = dbUsers;
        this.handle = async (input) => {
            if (!input)
                throw new core_1.BadRequestError("No Input!");
            const { actor, entity_type, item_id, message, notifier } = input;
            const currentNotificationEntityType = await this.dbNotificationEntity.findOne({
                where: { name: entity_type },
            });
            if (!currentNotificationEntityType)
                throw new core_1.BadRequestError("Invalid Notification Entity Type!");
            const entity_type_id = currentNotificationEntityType.id;
            if (actor !== "SYSTEM") {
                const actorExists = await this.dbUsers.findOne({ where: { id: actor.id } });
                if (!actorExists)
                    throw new core_1.BadRequestError("Invalid Actor");
            }
            const transaction = await core_1.sequelize.transaction();
            const newNotifications = [];
            try {
                await Promise.all(notifier.map(async (notifier_id) => {
                    const notifierExists = await this.dbUsers.findOne({ where: { id: notifier_id } });
                    if (!notifierExists)
                        throw new core_1.BadRequestError("Invalid Notifier");
                    const notification = await this.dbNotifications.create({
                        actor: actor === "SYSTEM" ? undefined : actor.id,
                        entity_type_id,
                        item_id,
                        notifier: notifier_id,
                        message,
                    });
                    newNotifications.push(notification);
                    const io = web_socket_1.Websocket.getInstance();
                    const event_id = `${web_socket_1.WEBSOCKET_CONSTANT.NOTIFICATION.EVENTS.NEW_NOTIFICATION}:${notifier_id}`;
                    console.log("event:", event_id);
                    io.of(web_socket_1.WEBSOCKET_CONSTANT.NOTIFICATION.NAMESPACE).emit(event_id, {
                        notification,
                    });
                }));
                transaction.commit();
                core_1.logger.info(`Notification Created Successfully: ${JSON.stringify(newNotifications)}`);
                return {
                    code: core_1.HttpStatus.CREATED,
                    data: newNotifications,
                    message: "Notification Created successfully",
                };
            }
            catch (error) {
                transaction.rollback();
                core_1.logger.error(error?.message);
                throw new Error("Internal Server Error");
            }
        };
        this.validate_item_based_on_entity = (item_id, entity_type) => { };
    }
}
exports.createNotification = new CreateNotification(models_1.NotificationEntity, models_1.Notifications, user_model_1.Users);
