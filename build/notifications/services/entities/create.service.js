"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationEntity = void 0;
const common_1 = require("@/core/common");
const core_1 = require("@/core");
const models_1 = require("@/notifications/models");
const utils_1 = require("@/notifications/utils");
class CreateNotificationEntity {
    constructor(dbNotificationEntity) {
        this.dbNotificationEntity = dbNotificationEntity;
        this.handle = async ({ input, user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            const name = (0, utils_1.convertToUpperCaseWithUnderscore)(input?.name);
            const notificationEntityExists = await this.dbNotificationEntity.findOne({
                where: { name },
            });
            if (notificationEntityExists)
                throw new core_1.BadRequestError("Notification Entity Exists");
            const newNotificationEntity = await this.dbNotificationEntity.create({
                name,
                description: input?.description,
            });
            core_1.logger.info(`Notification Entity: ${JSON.stringify(newNotificationEntity)} created by ${user.id}`);
            return {
                code: core_1.HttpStatus.CREATED,
                data: newNotificationEntity,
                message: "Notification Entity Created successfully",
            };
        };
    }
}
exports.createNotificationEntity = new CreateNotificationEntity(models_1.NotificationEntity);
