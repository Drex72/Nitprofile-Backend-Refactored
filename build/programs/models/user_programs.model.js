"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrograms = void 0;
const user_model_1 = require("@/auth/model/user.model");
const core_1 = require("@/core");
const program_model_1 = require("@/programs/models/program.model");
const sequelize_1 = require("sequelize");
class UserPrograms extends sequelize_1.Model {
}
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
