import { type Context, HttpStatus, BadRequestError, logger } from "@/core"
import { AppMessages } from "@/core/common"
import { Program } from "@/programs/models"
import { type FindSingleProgram } from "@/programs/payload_interfaces"

class DeleteProgram {
    constructor(private readonly dbPrograms: typeof Program) {}

    handle = async ({ query, user }: Context<FindSingleProgram>) => {
        const { programId } = query

        const programExists = await this.dbPrograms.findOne({
            where: { id:programId, createdBy: user?.id },
        })

        if (!programExists) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        await this.dbPrograms.destroy({
            where: { id:programId, createdBy: user?.id },
        })

        logger.info(`Program with ID ${programId} deleted successfully`)

        return {
            code: HttpStatus.NO_CONTENT,
        }
    }
}

export const deleteProgram = new DeleteProgram(Program)
