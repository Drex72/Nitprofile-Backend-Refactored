"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNotifications = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/notifications/models");
class FindNotifications {
    constructor(dbNotifications) {
        this.dbNotifications = dbNotifications;
        this.handle = async ({ query, user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            if (query?.notification_id)
                return this.singleNotification(query?.notification_id, user.id);
            const allUserNotifications = await this.dbNotifications.findAll({
                where: { notifier: user.id },
            });
            core_1.logger.info(`Notifications for ${user.id} Found`);
            return {
                code: core_1.HttpStatus.OK,
                data: allUserNotifications,
                message: "Notifications Found for User successfully",
            };
        };
        this.singleNotification = async (notification_id, user_id) => {
            // Get more Indepth Details
            const singleNotification = await this.dbNotifications.findOne({
                where: { id: notification_id, notifier: user_id },
            });
            if (!singleNotification)
                throw new core_1.BadRequestError("Invalid Notification!");
            core_1.logger.info(`Notification for ${user_id} Found`);
            return {
                code: core_1.HttpStatus.OK,
                data: singleNotification,
                message: "Notification Found for user successfully",
            };
        };
    }
}
exports.findNotifications = new FindNotifications(models_1.Notifications);
