import { dispatch } from "@/app"
import { HttpStatus, logger, type Context, currentOrigin, generateRandStr, computeExpiryDate } from "@/core"
import { forgotPasswordMail } from "@/mails"
import { AppMessages } from "@/core/common"
import { Users } from "@/auth/model/user.model"
import type { ForgotPasswordPayload } from "@/auth/interfaces"

class ForgotPassword {
    constructor(private readonly dbUser: typeof Users) {}

    handle = async ({ input }: Context<ForgotPasswordPayload>) => {
        const { email } = input

        const user = await this.dbUser.findOne({ where: { email } })

        if (!user) {
            return {
                code: HttpStatus.OK,
                message: `${AppMessages.SUCCESS.EMAIL_SENT} ${email}`,
            }
        }

        const token = generateRandStr(64)

        user.resetToken = token

        const expDate = computeExpiryDate(1800)

        user.resetTokenExpiresIn = expDate

        await user.save()

        dispatch("event:sendMail", {
            to: email,
            subject: "Forgot Password",
            body: forgotPasswordMail({
                lastName: user.lastName,
                firstName: user.firstName,
                link: `${currentOrigin}/?token=${token}`,
            }),
        })

        logger.info("Successfully Sent Mail")

        return {
            code: HttpStatus.OK,
            message: `${AppMessages.SUCCESS.EMAIL_SENT} ${email}`,
        }
    }
}

export const forgotPassword = new ForgotPassword(Users)
