"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsAssignedPrograms = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("@/core");
const user_model_1 = require("@/auth/model/user.model");
const program_model_1 = require("@/programs/models/program.model");
class AdminsAssignedPrograms extends sequelize_1.Model {
}
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
