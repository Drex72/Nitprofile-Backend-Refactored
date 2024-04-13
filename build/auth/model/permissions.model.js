"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("@/core");
const types_1 = require("../helpers/permissions/types");
class Permissions extends sequelize_1.Model {
}
exports.Permissions = Permissions;
Permissions.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    resource: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    ability: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ENUM(...types_1.permission_abilities)),
        allowNull: false,
    },
}, {
    modelName: "permissions",
    tableName: "permissions",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
