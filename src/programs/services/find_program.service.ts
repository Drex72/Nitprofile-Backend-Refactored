import { type Context, HttpStatus, UnAuthorizedError, ForbiddenError } from "@/core"
import { AppMessages } from "@/core/common"
import { AdminsAssignedPrograms, Program, UserPrograms } from "@/programs/models"
import { type FindSingleProgram } from "@/programs/payload_interfaces"

class FindPrograms {
    constructor(
        private readonly dbPrograms: typeof Program,
        private readonly dbAdminPrograms: typeof AdminsAssignedPrograms,
        private readonly dbUserPrograms: typeof UserPrograms,
    ) {}

    findAll = async () => {
        const allPrograms = await this.dbPrograms.findAll()

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.DATA_FETCHED,
            data: allPrograms,
        }
    }

    findOne = async ({ query, user }: Context<FindSingleProgram>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const { id } = query

        const userRole = user?.role

        if (userRole === "ADMIN") {
            const adminProgram = await this.dbAdminPrograms.findOne({
                where: {
                    userId: user.id,
                    programId: id,
                },
            })

            if (!adminProgram) throw new ForbiddenError(AppMessages.FAILURE.FORBIDDEN_RESOURCE)
        }

        if (userRole === "USER") {
            const userProgram = await this.dbUserPrograms.findOne({
                where: {
                    userId: user.id,
                    programId: id,
                },
            })

            if (!userProgram) throw new ForbiddenError(AppMessages.FAILURE.FORBIDDEN_RESOURCE)
        }

        const program = await this.dbPrograms.findOne({
            where: { id },
        })

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.DATA_FETCHED,
            data: program,
        }
    }

    findForUsers = async ({ user }: Context<FindSingleProgram>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const userPrograms = await this.dbUserPrograms.findAll({
            where: {
                userId: user.id,
            },

            include: [
                {
                    model: Program,
                    attributes: ["id", "createdBy", "name", "startDate", "endDate", "isCompleted"],
                },
            ],
        })

        const formattedUserPrograms = userPrograms.map((userProgram) => userProgram.get("Program"))

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.DATA_FETCHED,
            data: formattedUserPrograms,
        }
    }

    findForAdmins = async ({ user }: Context<FindSingleProgram>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const adminPrograms = await this.dbAdminPrograms.findAll({
            where: {
                userId: user.id,
            },

            include: [
                {
                    model: Program,
                    attributes: ["id", "createdBy", "name", "startDate", "endDate", "isCompleted"],
                },
            ],
        })

        const formattedAdminPrograms = adminPrograms.map((adminAssignedProgram) => adminAssignedProgram.get("Program"))

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.DATA_FETCHED,
            data: formattedAdminPrograms,
        }
    }
}

export const findPrograms = new FindPrograms(Program, AdminsAssignedPrograms, UserPrograms)
