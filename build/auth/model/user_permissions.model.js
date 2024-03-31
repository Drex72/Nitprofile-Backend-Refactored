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
exports.UserPermissions = void 0;
var sequelize_1 = require("sequelize");
var core_1 = require("@/core");
var permissions_model_1 = require("./permissions.model");
var user_model_1 = require("./user.model");
var UserPermissions = /** @class */ (function (_super) {
    __extends(UserPermissions, _super);
    function UserPermissions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserPermissions;
}(sequelize_1.Model));
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
