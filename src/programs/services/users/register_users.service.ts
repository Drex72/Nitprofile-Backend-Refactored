import { dispatch } from "@/app"
import { Users } from "@/auth/model"
import { AppMessages } from "@/core/common"
import { create_user } from "@/auth/helpers/user"
import { type Context, HttpStatus, BadRequestError, logger, ForbiddenError, sequelize, config } from "@/core"
import { customCsvToJsonConverter } from "@/programs/helpers/csvToJson"
import { Program, UserPrograms } from "@/programs/models"
import { type FindSingleProgram } from "@/programs/payload_interfaces"

class RegisterProgramUsers {
    constructor(
        private readonly dbPrograms: typeof Program,
        private readonly dbUsers: typeof Users,
        private readonly dbUserPrograms: typeof UserPrograms,
    ) {}

    handle = async ({ query, files }: Context<FindSingleProgram>) => {
        if (!files || !files.csv || Array.isArray(files.csv)) throw new ForbiddenError("csv is required")

        const csvFile = files.csv

        const { id } = query

        const program = await this.dbPrograms.findOne({
            where: { id },
        })

        if (!program) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        const dbTransaction = await sequelize.transaction()

        try {
            const convertedJson = await customCsvToJsonConverter.convert(csvFile.tempFilePath)

            await Promise.all(
                convertedJson.map(async (user) => {
                    let existingUser = await this.dbUsers.findOne({
                        where: { email: user.email },
                    })

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

                    const userProgramExists = await this.dbUserPrograms.findOne({
                        where: { userId: existingUser.id, programId: program.id },
                    })

                    if (userProgramExists) throw new BadRequestError(AppMessages.FAILURE.USER_ALREADY_ASSIGNED_TO_PROGRAM)

                    await this.dbUserPrograms.create(
                        {
                            userId: existingUser.id,
                            programId: program.id,
                        },
                        { transaction: dbTransaction },
                    )

                    dispatch("event:sendNewUserMail", {
                        email: existingUser.email,
                        firstName: existingUser.firstName,
                        lastName: existingUser.lastName,
                        userId: existingUser.id,
                        programName: program.name,
                        programId: program.id,
                        token: "",
                    })

                    logger.info(`User with Name ${existingUser.firstName} Assigned to program ${program.name} successfully`)
                }),
            )

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
}

export const registerProgramUsers = new RegisterProgramUsers(Program, Users, UserPrograms)
