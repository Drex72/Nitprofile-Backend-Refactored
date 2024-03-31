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
exports.AdminsAssignedPrograms = void 0;
var sequelize_1 = require("sequelize");
var core_1 = require("@/core");
var user_model_1 = require("@/auth/model/user.model");
var program_model_1 = require("@/programs/models/program.model");
var AdminsAssignedPrograms = /** @class */ (function (_super) {
    __extends(AdminsAssignedPrograms, _super);
    function AdminsAssignedPrograms() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AdminsAssignedPrograms;
}(sequelize_1.Model));
exports.AdminsAssignedPrograms = AdminsAssignedPrograms;
AdminsAssignedPrograms.init({
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
}, {
    modelName: "admins_assigned_programs",
    tableName: "admins_assigned_programs",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
// AdminsAssignedPrograms.belongsTo(Users, { foreignKey: "userId" })
// AdminsAssignedPrograms.belongsTo(Program, { foreignKey: "programId" })
