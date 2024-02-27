import { type Context, HttpStatus, UnAuthorizedError, BadRequestError } from "@/core"
import { AppMessages } from "@/core/common"
import { Program } from "@/programs/models"
import { type FindSingleProgram } from "@/programs/payload_interfaces"

class FindProgramUsers {
    constructor(private readonly dbPrograms: typeof Program) {}

    handle = async ({ user, query }: Context<FindSingleProgram>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const program = await this.dbPrograms.findOne({
            where: {
                id: query.programId,
            },
        })

        if (!program) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        const programUsers = await program?.getRegisteredUsers({
            attributes: {
                exclude: ["refreshToken", "refreshTokenExp", "password"],
            },
        })

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.DATA_FETCHED,
            data: programUsers ?? [],
        }
    }
}

export const findProgramUsers = new FindProgramUsers(Program)
