"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("@/core");
const user_model_1 = require("@/auth/model/user.model");
class Program extends sequelize_1.Model {
}
exports.Program = Program;
Program.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    createdBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_model_1.Users,
            key: "id",
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    isCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    // Profile
    profileFrameSecureUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    profileFramePublicId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    profileFrameHeight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    profileFrameWidth: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    profileGenerationAvailable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    // Certificate
    certificateFrameSecureUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    certificateFramePublicId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    certificateFrameHeight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    certificateFrameWidth: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    certificateGenerationAvailable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    modelName: "programs",
    tableName: "programs",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
// Hook to set isCompleted to false if endDate is equal to the current date
Program.beforeUpdate(async (program, options) => {
    if (program.changed("endDate") && program.endDate.toDateString() === new Date().toDateString()) {
        program.isCompleted = true;
    }
});
