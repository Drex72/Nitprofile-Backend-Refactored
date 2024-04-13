"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificationEntity = void 0;
const core_1 = require("@/core");
const models_1 = require("@/notifications/models");
const common_1 = require("@/core/common");
class DeleteNotificationEntity {
    constructor(dbNotificationEntity) {
        this.dbNotificationEntity = dbNotificationEntity;
        this.handle = async ({ query, user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const currentNotificationEntity = await this.dbNotificationEntity.findOne({
                where: { id: query.entity_id },
            });
            if (!currentNotificationEntity)
                throw new core_1.BadRequestError("Invalid Notification Entity");
            await this.dbNotificationEntity.destroy({ where: { id: query.entity_id } });
            core_1.logger.info(`Notification Entity: ${query?.entity_id} deleted by ${user.id}`);
            return {
                code: core_1.HttpStatus.NO_CONTENT,
                message: "Notification Entity Deleted successfully",
            };
        };
    }
}
exports.deleteNotificationEntity = new DeleteNotificationEntity(models_1.NotificationEntity);
