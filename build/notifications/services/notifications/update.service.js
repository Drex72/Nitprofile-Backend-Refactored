"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatenotifications = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/notifications/models");
class UpdateNotifications {
    constructor(dbNotifications) {
        this.dbNotifications = dbNotifications;
        this.handle = async ({ query, user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            if (query?.notification_id)
                return this.markSingleAsRead(query?.notification_id, user.id);
            await this.dbNotifications.update({ read: true }, {
                where: { notifier: user.id },
            });
            core_1.logger.info(`Notifications for ${user.id} Marked as Read`);
            return {
                code: core_1.HttpStatus.OK,
                message: "Notifications marked as read for User successfully",
            };
        };
        this.markSingleAsRead = async (notification_id, user_id) => {
            const singleNotification = await this.dbNotifications.findOne({
                where: { id: notification_id, notifier: user_id },
            });
            if (!singleNotification)
                throw new core_1.BadRequestError("Invalid Notification!");
            singleNotification.read = true;
            await singleNotification.save();
            core_1.logger.info(`Notification ${singleNotification.message} marked as read for ${user_id}`);
            return {
                code: core_1.HttpStatus.OK,
                data: singleNotification,
                message: "Notification marked as read for user successfully",
            };
        };
    }
}
exports.updatenotifications = new UpdateNotifications(models_1.Notifications);
