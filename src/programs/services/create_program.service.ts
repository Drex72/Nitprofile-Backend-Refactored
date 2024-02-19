import { type Context, HttpStatus, BadRequestError, logger } from "@/core"
import { AppMessages } from "@/core/common"
import { Program } from "@/programs/models"
import { type CreateProgramPayload } from "@/programs/payload_interfaces"


class CreateProgram {
    constructor(private readonly dbPrograms: typeof Program) {}

    handle = async ({ input, user }: Context<CreateProgramPayload>) => {
        const { endDate, name, startDate } = input

        const programExists = await this.dbPrograms.findOne({
            where: { name },
        })

        if (programExists) throw new BadRequestError(AppMessages.FAILURE.PROGRAM_EXISTS)

        if (startDate < new Date(Date.now())) throw new BadRequestError(AppMessages.FAILURE.START_DATE_ERROR)

        if (endDate < startDate) throw new BadRequestError(AppMessages.FAILURE.DATE_DURATION_ERROR)

        const createdProgram = await this.dbPrograms.create({ ...input, createdBy: user?.id })

        logger.info(`Program with ID ${createdProgram.id} created successfully`)

        return {
            code: HttpStatus.CREATED,
            message: AppMessages.SUCCESS.PROGRAM_CREATED,
            data: createdProgram,
        }
    }
}

export const createProgram = new CreateProgram(Program)
