import { type Context, HttpStatus, BadRequestError, logger, UnAuthorizedError, sequelize } from "@/core"
import { AppMessages } from "@/core/common"
import { AdminsAssignedPrograms, Program, ProgramNodes } from "@/programs/models"
import { type CreateProgramNodesPayload } from "@/programs/payload_interfaces"

class CreateProgramNodes {
    constructor(private readonly dbAdminPrograms: typeof AdminsAssignedPrograms, private readonly dbProgramNodes: typeof ProgramNodes) {}

    handle = async ({ input, user, query }: Context<CreateProgramNodesPayload>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const { nodes } = input

        const { id } = query

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

        if (!adminProgram) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        const dbTransaction = await sequelize.transaction()

        const createdNodes: ProgramNodes[] = []

        try {
            await Promise.all(
                nodes.map(async (node) => {
                    const createdNode = await this.dbProgramNodes.create({ ...node, programId: id }, { transaction: dbTransaction })

                    logger.info(`Program Node with ID ${createdNode.id} created successfully`)

                    createdNodes.push(createdNode)
                }),
            )

            dbTransaction.commit()
        } catch (error: any) {
            dbTransaction.rollback()

            logger.error(error?.message)

            throw new Error("Internal Server Error")
        }

        return {
            code: HttpStatus.CREATED,
            message: AppMessages.SUCCESS.PROGRAM_NODE_CREATED,
            data: createdNodes,
        }
    }
}

export const createProgramNodes = new CreateProgramNodes(AdminsAssignedPrograms, ProgramNodes)
