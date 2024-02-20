import { Users } from "@/auth/model"
import { type Context, HttpStatus, BadRequestError, logger, UnAuthorizedError, generateCloudinaryTransformationImage } from "@/core"
import { AppMessages } from "@/core/common"
import { placeHolderTextConverter } from "@/programs/helpers/placeholderText"
import { Program, ProgramNodes, UserPrograms } from "@/programs/models"
import { type GenerateProgramProfilePayload } from "@/programs/payload_interfaces"
import type { Node } from "@/programs/types"

class GenerateProfile {
    constructor(
        private readonly dbPrograms: typeof Program,
        private readonly dbUserPrograms: typeof UserPrograms,
        private readonly dbProgramNodes: typeof ProgramNodes,
        private readonly dbUser: typeof Users,
    ) {}

    handle = async ({ params, user }: Context<GenerateProgramProfilePayload>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const { program_id } = params

        const existingUser = await this.dbUser.findOne({ where: { id: user.id } })

        if (!existingUser || !existingUser.profilePicPublicId) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROFILE_PICTURE)

        const program = await this.dbPrograms.findOne({
            where: { id: program_id },
        })

        if (!program) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        const userProgram = await this.dbUserPrograms.findOne({
            where: { userId: user.id, programId: program_id },
        })

        if (!userProgram) throw new BadRequestError("You are not registered for this program")

        const programNodes = await this.dbProgramNodes.findAll({
            where: { programId: program_id },
        })

        if (!program.profileGenerationAvailable) {
            throw new BadRequestError(AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE)
        }

        let profile_url

        if (userProgram.profileImageUrl) profile_url = userProgram.profileImageUrl

        if (!userProgram.profileImageUrl || existingUser.changed("profilePicSecureUrl")) {
            const refactoredNodes: Node[] = []

            await Promise.all(
                programNodes.map(async (node) => {
                    if (node.type === "image" && !node.overlay) {
                        node.overlay = existingUser.profilePicPublicId!.replace(/\//g, ":")

                        refactoredNodes.push(node)
                    }

                    if (node.type === "text" && node.placeholder) {
                        const refactoredNode = await placeHolderTextConverter.convert_entity_placeholder(
                            {
                                ...node,
                                type: "text",
                            },
                            { programId: program.id, userId: existingUser.id },
                        )

                        refactoredNode && refactoredNodes.push(refactoredNode)
                    }
                }),
            )

            const profileImageUrl = generateCloudinaryTransformationImage({
                framePublicId: program.profileFramePublicId,
                height: program.profileFrameHeight,
                nodes: refactoredNodes,
                width: program.profileFrameWidth,
            })

            userProgram.profileImageUrl = profileImageUrl
            userProgram.profileGenerationDate = new Date(Date.now())

            await userProgram.save()
        }

        logger.info(`Program with ID ${program.id} updated successfully`)

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.PROGRAM_UPDATED,
            data: userProgram.profileImageUrl,
        }
    }
}

export const generateProfile = new GenerateProfile(Program, UserPrograms, ProgramNodes, Users)
