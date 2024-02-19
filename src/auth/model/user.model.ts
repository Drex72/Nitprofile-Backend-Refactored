import { DataTypes, type CreationOptional, type InferAttributes, type InferCreationAttributes, Model, UUIDV4 } from "sequelize"
import { sequelize, type IAuthRoles, auth_roles } from "@/core"
import { AdminsAssignedPrograms } from "@/programs/models"

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id: CreationOptional<string>
    declare firstName: string
    declare otherName: CreationOptional<string | null>
    declare lastName: string
    declare password: CreationOptional<string>
    declare email: string
    declare emailVerified: CreationOptional<boolean>
    declare profilePicPublicId: CreationOptional<string | null>
    declare profilePicSecureUrl: CreationOptional<string | null>
    declare resetToken?: CreationOptional<string | null>
    declare resetTokenExpiresIn?: CreationOptional<Date | null>
    declare refreshToken: CreationOptional<string>
    declare refreshTokenExp: CreationOptional<Date>
    declare isVerified: CreationOptional<boolean>
    declare role: IAuthRoles
}

Users.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otherName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        profilePicPublicId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profilePicSecureUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        refreshToken: {
            type: DataTypes.STRING(400),
            allowNull: true,
        },
        refreshTokenExp: {
            type: DataTypes.DATE,

            allowNull: true,
        },

        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM(...auth_roles),
            allowNull: false,
        },
    },
    {
        scopes: {
            withPassword: {
                attributes: {
                    include: ["password"],
                },
            },
            withRefreshToken: {
                attributes: {
                    include: ["refreshToken", "refreshTokenExp"],
                },
            },
        },

        modelName: "users",
        tableName: "users",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)


Users.hasMany(AdminsAssignedPrograms, { foreignKey: 'userId' });
