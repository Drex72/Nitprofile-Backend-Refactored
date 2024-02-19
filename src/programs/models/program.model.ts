import { DataTypes, type CreationOptional, type InferAttributes, type InferCreationAttributes, Model, UUIDV4, type ForeignKey } from "sequelize"
import { sequelize } from "@/core"
import { Users } from "@/auth/model"
import { AdminsAssignedPrograms } from "@/programs/models"

export class Program extends Model<InferAttributes<Program>, InferCreationAttributes<Program>> {
    declare id: CreationOptional<string>
    declare createdBy: ForeignKey<Users["id"]>
    declare name: string
    declare startDate: Date
    declare endDate: Date
    declare isCompleted: CreationOptional<boolean>

    // Profile
    declare profileFrameSecureUrl: CreationOptional<string>
    declare profileFramePublicId: CreationOptional<string>
    declare profileFrameWidth: CreationOptional<number>
    declare profileFrameHeight: CreationOptional<number>

    // Profile
    declare certificateFrameSecureUrl: CreationOptional<string>
    declare certificateFramePublicId: CreationOptional<string>
    declare certificateFrameWidth: CreationOptional<number>
    declare certificateFrameHeight: CreationOptional<number>
}

Program.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true,
        },
        createdBy: {
            type: DataTypes.UUID,
            references: {
                model: Users,
                key: "id",
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        // Profile
        profileFrameSecureUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileFramePublicId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileFrameHeight: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        profileFrameWidth: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        // Certificate
        certificateFrameSecureUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        certificateFramePublicId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        certificateFrameHeight: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        certificateFrameWidth: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        modelName: "program",
        tableName: "program",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)

// Hook to set isCompleted to false if endDate is equal to the current date
Program.beforeUpdate(async (program, options) => {
    if (program.changed("endDate") && program.endDate.toDateString() === new Date().toDateString()) {
        program.isCompleted = true
    }
})

Program.hasMany(AdminsAssignedPrograms, { foreignKey: "programId" })
