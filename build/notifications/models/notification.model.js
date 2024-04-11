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
exports.Notifications = void 0;
var sequelize_1 = require("sequelize");
var core_1 = require("../../core");
var user_model_1 = require("../../auth/model/user.model");
var notification_entity_model_1 = require("./notification_entity.model");
var Notifications = /** @class */ (function (_super) {
    __extends(Notifications, _super);
    function Notifications() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Notifications;
}(sequelize_1.Model));
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
