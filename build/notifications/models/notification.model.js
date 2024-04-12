"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("@/core");
const user_model_1 = require("@/auth/model/user.model");
const notification_entity_model_1 = require("./notification_entity.model");
class Notifications extends sequelize_1.Model {
}
exports.Notifications = Notifications;
Notifications.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    item_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    actor: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: user_model_1.Users,
            key: "id",
        },
    },
    notifier: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_model_1.Users,
            key: "id",
        },
    },
    entity_type_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: notification_entity_model_1.NotificationEntity,
            key: "id",
        },
    },
}, {
    sequelize: core_1.sequelize,
    freezeTableName: true,
    tableName: "notifications",
    modelName: "notifications",
    timestamps: true,
});
