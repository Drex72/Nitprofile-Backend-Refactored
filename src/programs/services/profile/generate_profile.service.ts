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

    handle = async ({ query, user }: Context<GenerateProgramProfilePayload>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const { programId } = query

        const userProgram = await this.dbUserPrograms.findOne({
            where: { userId: user.id, programId },
        })

        if (!userProgram) throw new BadRequestError("You are not registered for this program")

        const program = await this.dbPrograms.findOne({
            where: { id: programId },
        })

        if (!program) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        const existingUser = await this.dbUser.findOne({ where: { id: user.id } })

        if (!existingUser) throw new BadRequestError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const programNodes = await this.dbProgramNodes.scope("").findAll({
            where: { programId },
        })

        if (!program.profileGenerationAvailable) {
            throw new BadRequestError(AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE)
        }

        const profilePictureNode = programNodes.find((node) => node.type === "image" && node.overlay)

        if (profilePictureNode && !existingUser.profilePicPublicId) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROFILE_PICTURE)

        let profile_url

        console.log(userProgram.profileImageUrl, "initla url")

        // if (userProgram.profileImageUrl) profile_url = userProgram.profileImageUrl

        if (true) {
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

            console.log(profileImageUrl, "added")

            userProgram.profileImageUrl = profileImageUrl
            userProgram.profileGenerationDate = new Date(Date.now())

            await userProgram.save()
        }

        logger.info(`Profile for User ${existingUser.id} Generated successfully`)

        return {
            code: HttpStatus.OK,
            message: "Profile for User Generated successfully",
            data: profile_url,
        }
    }
}

export const generateProfile = new GenerateProfile(Program, UserPrograms, ProgramNodes, Users)
