import { dispatch } from "@/app"
import { type Context, HttpStatus, BadRequestError, UnAuthorizedError } from "@/core"
import { AppMessages } from "@/core/common"
import { AdminsAssignedPrograms, Program, ProgramNodes, UserPrograms } from "@/programs/models"
import { type FindSingleProgram } from "@/programs/payload_interfaces"
import { isProgramProfileValid } from "@/programs/utils"

class EnableProfileGeneration {
    constructor(
        private readonly dbAdminPrograms: typeof AdminsAssignedPrograms,
        private readonly dbPrograms: typeof Program,
        private readonly dbProgramNodes: typeof ProgramNodes,
        private readonly dbUserPrograms: typeof UserPrograms,
    ) {}

    handle = async ({ user, query }: Context<FindSingleProgram>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const { id } = query

        const program = await this.dbPrograms.findOne({ where: { id } })

        if (!program) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        if (isProgramProfileValid(program)) {
            throw new BadRequestError(AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE)
        }

        const adminProgram = await this.dbAdminPrograms.findOne({
            where: {
                userId: user.id,
                programId: id,
            },

            include: [
                {
                    model: Program,
                    attributes: ["id", "createdBy", "name", "startDate", "endDate", "isCompleted"],
                },
            ],
        })

        if (!adminProgram) throw new BadRequestError(AppMessages.FAILURE.FORBIDDEN_PROGRAM)

        const programNodes = await this.dbProgramNodes.findAll({ where: { programId: id } })

        if (!programNodes || programNodes.length === 0) throw new BadRequestError(AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE)

        program.profileGenerationAvailable = true

        await program.save()

        const programUsers = await this.dbUserPrograms.findAll({
            where: {
                programId: query.id,
            },
        })

        const users: string[] = programUsers.map((user) => user.id)

        dispatch("event:newNotification", {
            actor: { id: user.id },
            entity_type: "PROFILE_AVAILABLE",
            item_id: id,
            message: `Profile Generation for Program ${program.name} is now Available.`,
            notifier: users,
        })

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.PROFILE_GENERATION_AVAILABLE,
            data: program,
        }
    }
}

export const enableProfileGeneration = new EnableProfileGeneration(AdminsAssignedPrograms, Program, ProgramNodes, UserPrograms)
