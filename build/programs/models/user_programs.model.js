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
exports.UserPrograms = void 0;
var user_model_1 = require("../../auth/model/user.model");
var core_1 = require("../../core");
var program_model_1 = require("../../programs/models/program.model");
var sequelize_1 = require("sequelize");
var UserPrograms = /** @class */ (function (_super) {
    __extends(UserPrograms, _super);
    function UserPrograms() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserPrograms;
}(sequelize_1.Model));
exports.UserPrograms = UserPrograms;
UserPrograms.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: user_model_1.Users,
            key: "id",
        },
    },
    programId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: program_model_1.Program,
            key: "id",
        },
    },
    completedTraining: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    profileImageUrl: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    profileGenerationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    certificateImageUrl: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    certificateGenerationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    acceptanceMailSent: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ["userId", "programId"],
        },
    ],
    modelName: "user_programs",
    tableName: "user_programs",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
