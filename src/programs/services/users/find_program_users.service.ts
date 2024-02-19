import { Users } from "@/auth/model"
import { type Context, HttpStatus, UnAuthorizedError } from "@/core"
import { AppMessages } from "@/core/common"
import { UserPrograms } from "@/programs/models"
import { type FindSingleProgram } from "@/programs/payload_interfaces"

class FindProgramUsers {
    constructor(private readonly dbUserPrograms: typeof UserPrograms) {}

    handle = async ({ user, query }: Context<FindSingleProgram>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const programUsers = await this.dbUserPrograms.findAll({
            where: {
                programId: query.id,
            },

            include: [
                {
                    model: Users,
                },
            ],
        })

        const formattedProgramUsers = programUsers.map((programUser) => programUser.get("Users"))

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.DATA_FETCHED,
            data: formattedProgramUsers,
        }
    }
}

export const findProgramUsers = new FindProgramUsers(UserPrograms)
