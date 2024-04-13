"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllNotificationEntities = void 0;
const core_1 = require("@/core");
const models_1 = require("@/notifications/models");
class FindNotificationEntity {
    constructor(dbNotificationEntity) {
        this.dbNotificationEntity = dbNotificationEntity;
        this.handle = async () => {
            const allNotificationEntities = await this.dbNotificationEntity.findAll();
            core_1.logger.info(`Notification Entities Found`);
            return {
                code: core_1.HttpStatus.OK,
                data: allNotificationEntities,
                message: "Notification Entity Found successfully",
            };
        };
    }
}
exports.findAllNotificationEntities = new FindNotificationEntity(models_1.NotificationEntity);
