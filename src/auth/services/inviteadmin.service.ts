import { HttpStatus, logger, type Context, UnAuthorizedError, currentOrigin } from "@/core"
import type { InviteAdminPayload } from "../payload_interfaces"
import { AppMessages } from "@/core/common"
import { tokenService, type TokenService } from "../helpers/token"
import type { Users as IUsers } from "../model"
import { Users } from "@/auth/model/user.model"
import { dispatch } from "@/app"
import { adminInvitationMail } from "@/mails"
import { cache } from "@/app/app-cache"

class InviteAdmin {
    constructor(private readonly dbUser: typeof IUsers, private readonly tokenService: TokenService) {}

    handle = async ({ input }: Context<InviteAdminPayload>) => {
        const { email } = input

        const user = await this.dbUser.findOne({
            where: { email },
        })

        if (user) throw new UnAuthorizedError(AppMessages.FAILURE.EMAIL_EXISTS)

        const inviteToken = this.tokenService.generateAdminInviteToken({ email })

        await cache.set(email, inviteToken, "EX", 1200)

        dispatch("event:sendMail", {
            to: email,
            subject: "NITProfile Admin Invitation",
            body: adminInvitationMail({
                link: `${currentOrigin}?token=${inviteToken}`,
            }),
        })

        logger.info(`Admin with email ${email} invited successfully`)

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.LOGIN,
        }
    }
}

export const inviteAdmin = new InviteAdmin(Users, tokenService)
