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
exports.NotificationEntity = void 0;
var sequelize_1 = require("sequelize");
var core_1 = require("@/core");
var NotificationEntity = /** @class */ (function (_super) {
    __extends(NotificationEntity, _super);
    function NotificationEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotificationEntity;
}(sequelize_1.Model));
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
