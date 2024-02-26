import { dispatch } from "@/app"
import { Users } from "@/auth/model"
import { AppMessages } from "@/core/common"
import { create_user } from "@/auth/helpers/user"
import { type Context, HttpStatus, BadRequestError, logger, ForbiddenError, sequelize, config, Joi } from "@/core"
import { customCsvToJsonConverter } from "@/programs/helpers/csvToJson"
import { Program, UserPrograms } from "@/programs/models"
import { type RegisterProgramUser } from "@/programs/payload_interfaces"
import type { ISendUsersEmail } from "@/programs/listeners"

interface IBaseUser {
    email: string
    firstName: string
    lastName: string
    programId: string
}

const csvSchema = Joi.object({
    email: Joi.string().required().trim(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
})

class RegisterProgramUsers {
    constructor(
        private readonly dbPrograms: typeof Program,
        private readonly dbUsers: typeof Users,
        private readonly dbUserPrograms: typeof UserPrograms,
    ) {}

    handle = async ({ input, query, files }: Context<RegisterProgramUser>) => {
        const program = await this.dbPrograms.findOne({
            where: { id: query.programId },
        })

        if (!program) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        if (Object.keys(input).length > 0) {
            const user = await this._create_single_program_user({
                email: input.user.email,
                firstName: input.user.firstName,
                lastName: input.user.lastName,
                programId: query.programId,
            })

            const { password: dbPassword, refreshToken, refreshTokenExp, ...responsePayload } = user.dataValues

            return {
                code: HttpStatus.CREATED,
                message: AppMessages.SUCCESS.USER_REGISTERED_SUCCESSFULLY,
                data: responsePayload,
            }
        }

        if (!files || !files.csv || Array.isArray(files.csv)) throw new ForbiddenError("csv is required")

        const csvFile = files.csv

        const dbTransaction = await sequelize.transaction()

        try {
            const convertedJson = await customCsvToJsonConverter.convert(csvFile.tempFilePath)

            const sendMailPayload: ISendUsersEmail[] = []

            await Promise.all(
                convertedJson.map(async (user) => {
                    let value = csvSchema.validate(user)

                    if (value.error) throw new BadRequestError("Invalid CSV")

                    let existingUser = await this.dbUsers.findOne({
                        where: { email: user.email },
                    })

                    if (existingUser) {
                        const userProgramExists = await this.dbUserPrograms.findOne({
                            where: { userId: existingUser.id, programId: program.id },
                        })

                        if (userProgramExists) throw new BadRequestError(AppMessages.FAILURE.USER_ALREADY_ASSIGNED_TO_PROGRAM)
                    }

                    if (!existingUser) {
                        existingUser = await create_user._create_single_user({
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            password: config.userDefaultPassword,
                            role: "USER",
                        })

                        logger.info(`User with ID ${existingUser.id} created successfully`)
                    }

                    await this.dbUserPrograms.create(
                        {
                            userId: existingUser.id,
                            programId: program.id,
                        },
                        { transaction: dbTransaction },
                    )

                    sendMailPayload.push({
                        programName: program.name,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: "",
                        email: user.email,
                        userId: existingUser.id,
                        programId: program.id,
                    })

                    logger.info(`User with Name ${user.firstName} Assigned to program ${program.name} successfully`)
                }),
            )

            dispatch("event:sendNewUserMail", sendMailPayload)

            await dbTransaction.commit()
        } catch (error: any) {
            dbTransaction.rollback()

            logger.error(error?.message)

            throw new Error("Internal Server Error")
        }

        return {
            code: HttpStatus.CREATED,
            message: AppMessages.SUCCESS.USERS_REGISTERED_SUCCESSFULLY,
        }
    }

    private _create_single_program_user = async (input: IBaseUser) => {
        const { email, firstName, lastName, programId } = input

        const user = await create_user._create_single_user({
            email,
            firstName,
            lastName,
            password: config.userDefaultPassword,
            role: "USER",
        })

        logger.info(`User with ID ${user.id} created successfully`)

        await this.dbUserPrograms.create({
            userId: user.id,
            programId: programId,
        })

        return user
    }
}

export const registerProgramUsers = new RegisterProgramUsers(Program, Users, UserPrograms)
