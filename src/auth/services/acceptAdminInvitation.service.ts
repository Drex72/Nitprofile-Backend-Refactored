import { HttpStatus, logger, type Context, UnAuthorizedError } from "@/core"
import type { AcceptAdminInvitationPayload } from "../payload_interfaces"
import { AppMessages } from "@/core/common"
import { tokenService, type TokenService } from "../helpers/token"
import { create_user } from "../helpers/user"
import { cache } from "@/app/app-cache"

class AcceptInvitation {
    constructor(private readonly tokenService: TokenService) {}

    handle = async ({ input, query }: Context<AcceptAdminInvitationPayload>) => {
        const { token } = query

        const tokenValid = this.tokenService.verifyAdminInviteToken(token)

        if (!tokenValid) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const { email } = tokenValid

        const cachedToken = await cache.get(email)

        if (cachedToken !== token) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const created_user = await create_user._create_single_user({ ...input, role: "ADMIN" })

        logger.info(`User with email ${input.email} invited successfully`)

        return {
            code: HttpStatus.CREATED,
            message: AppMessages.SUCCESS.SIGNUP,
            data: created_user,
        }
    }
}

export const acceptInvitation = new AcceptInvitation(tokenService)
