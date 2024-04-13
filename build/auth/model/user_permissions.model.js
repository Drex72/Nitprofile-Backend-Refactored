"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissions = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("@/core");
const permissions_model_1 = require("./permissions.model");
const user_model_1 = require("./user.model");
class UserPermissions extends sequelize_1.Model {
}
exports.UserPermissions = UserPermissions;
UserPermissions.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    permissionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: permissions_model_1.Permissions,
            key: "id",
        },
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: user_model_1.Users,
            key: "id",
        },
    },
}, {
    modelName: "user_permissions",
    tableName: "user_permissions",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
