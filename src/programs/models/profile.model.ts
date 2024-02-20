import { DataTypes, type CreationOptional, type InferAttributes, type InferCreationAttributes, Model, UUIDV4, type ForeignKey } from "sequelize"
import { sequelize } from "@/core"
import { Program } from "@/programs/models/program.model"

export class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    declare id: CreationOptional<string>
    declare programId: ForeignKey<Program["id"]>
    declare framePublicId: CreationOptional<string>
    declare frameSecureUrl: string
    declare frameWidth: number
    declare frameHeight: number
}

Profile.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        framePublicId: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        frameSecureUrl: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        frameHeight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        frameWidth: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelName: "profile",
        tableName: "profile",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
