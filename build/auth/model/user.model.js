"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.auth_roles = void 0;
var sequelize_1 = require("sequelize");
var core_1 = require("@/core");
exports.auth_roles = ["SUPER ADMIN", "ADMIN", "USER", "DEVELOPER"];
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Users;
}(sequelize_1.Model));
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
        type: sequelize_1.DataTypes.ENUM.apply(sequelize_1.DataTypes, exports.auth_roles),
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
