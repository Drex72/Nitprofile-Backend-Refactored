import { type Context, HttpStatus, BadRequestError, logger } from "@/core"
import { AppMessages } from "@/core/common"
import { Program } from "@/programs/models"
import { type UpdateProgramPayload } from "@/programs/payload_interfaces"

class UpdateProgram {
    constructor(private readonly dbPrograms: typeof Program) {}

    handle = async ({ input, query }: Context<UpdateProgramPayload>) => {
        const { name, startDate, endDate } = input

        const { id } = query

        const program = await this.dbPrograms.findOne({
            where: { name },
        })

        if (!program) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        if (startDate && startDate < new Date(Date.now())) {
            throw new BadRequestError(AppMessages.FAILURE.START_DATE_ERROR)
        }

        if (startDate && endDate && endDate < startDate) {
            throw new BadRequestError(AppMessages.FAILURE.DATE_DURATION_ERROR)
        }

        if (startDate && !endDate && program.endDate < startDate) {
            throw new BadRequestError(AppMessages.FAILURE.DATE_DURATION_ERROR)
        }

        if (endDate && !startDate && endDate < program.startDate) {
            throw new BadRequestError(AppMessages.FAILURE.DATE_DURATION_ERROR)
        }

        await this.dbPrograms.update(input, { where: { id } })

        logger.info(`Program with ID ${id} Updated successfully`)

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.PROGRAM_UPDATED,
        }
    }
}

export const updateProgram = new UpdateProgram(Program)
