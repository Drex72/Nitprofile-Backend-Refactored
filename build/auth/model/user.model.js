"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.auth_roles = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("@/core");
exports.auth_roles = ["SUPER ADMIN", "ADMIN", "USER", "DEVELOPER"];
class Users extends sequelize_1.Model {
}
exports.Users = Users;
Users.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    otherName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    emailVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    profilePicPublicId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExpiresIn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    profilePicSecureUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    refreshToken: {
        type: sequelize_1.DataTypes.STRING(600),
        allowNull: true,
    },
    refreshTokenExp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...exports.auth_roles),
        allowNull: false,
    },
}, {
    scopes: {
        withPassword: {
            attributes: {
                include: ["password"],
            },
        },
        withRefreshToken: {
            attributes: {
                include: ["refreshToken", "refreshTokenExp"],
            },
        },
    },
    indexes: [
        {
            unique: true,
            fields: ["email"],
        },
        {
            unique: true,
            fields: ["id"],
        },
    ],
    modelName: "users",
    tableName: "users",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
