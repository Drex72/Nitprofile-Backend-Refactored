import type { Users } from "@/auth/model"
import { type Context, HttpStatus, BadRequestError, logger, imageUploadService, ForbiddenError, config, UnAuthorizedError } from "@/core"
import { AppMessages } from "@/core/common"
import { Program, ProgramNodes, UserPrograms } from "@/programs/models"
import { type AddProgramProfileFramePayload, type GenerateProgramProfilePayload } from "@/programs/payload_interfaces"

class GenerateProfile {
    constructor(
        private readonly dbPrograms: typeof Program,
        private readonly dbUserPrograms: typeof UserPrograms,
        private readonly dbProgramNodes: typeof ProgramNodes,
        private readonly dbUser: typeof Users,
    ) {}

    handle = async ({ params, user, query, files }: Context<GenerateProgramProfilePayload>) => {
        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const { program_id } = params

        const existingUser = await this.dbUser.findOne({ where: { id: user.id } })

        if (!existingUser || !existingUser.profilePicSecureUrl) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROFILE_PICTURE)

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

        if (!programNodes || programNodes.length === 0)
            throw new BadRequestError("Profile generation is currently unavailable. Please reach out to the administrator for further details.")

        let profile_url

        if (userProgram.profileImageUrl) profile_url = userProgram.profileImageUrl

        if (!userProgram.profileImageUrl || existingUser.changed("profilePicSecureUrl")) {
            const uploadedImage = await imageUploadService.imageUpload(config.cloudinary.profileFrameFolder, files.frame)

            if (!uploadedImage) throw new BadRequestError("Error while uploading Frame. Please Try again later")

            userProgram.profileImageUrl = uploadedImage.secure_url
            userProgram.profileGenerationDate = new Date()

            await userProgram.save()
        }

        existingUser.changed("profilePicSecureUrl")

        

        logger.info(`Program with ID ${program.id} updated successfully`)

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.PROGRAM_UPDATED,
            data: program,
        }
    }
}

export const generateProfile = new GenerateProfile(Program)
