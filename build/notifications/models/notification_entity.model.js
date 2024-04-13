"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEntity = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("@/core");
class NotificationEntity extends sequelize_1.Model {
}
exports.NotificationEntity = NotificationEntity;
NotificationEntity.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: core_1.sequelize,
    freezeTableName: true,
    timestamps: true,
    tableName: "notification_entity",
    modelName: "notification_entity",
});
