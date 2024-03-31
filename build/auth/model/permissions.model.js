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
exports.Permissions = void 0;
var sequelize_1 = require("sequelize");
var core_1 = require("@/core");
var types_1 = require("../helpers/permissions/types");
var Permissions = /** @class */ (function (_super) {
    __extends(Permissions, _super);
    function Permissions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Permissions;
}(sequelize_1.Model));
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
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ENUM.apply(sequelize_1.DataTypes, types_1.permission_abilities)),
        allowNull: false,
    },
}, {
    modelName: "permissions",
    tableName: "permissions",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
