import { dispatch } from "@/app"
import { BadRequestError, HttpStatus, logger, type Context, currentOrigin, generateRandStr, computeExpiryDate } from "@/core"
import { forgotPasswordMail } from "@/mails"
import { AppMessages } from "@/core/common"

import { Users } from "@/auth/model/user.model"
import type { ForgotPasswordPayload } from "@/auth/payload_interfaces"

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

        if (user.emailVerified) throw new BadRequestError("Email already Verified")

        const token = generateRandStr(64)

        await this.dbUser.update({ resetToken: token, resetTokenExpiresIn: computeExpiryDate(1800) }, { where: { email } })

        await dispatch("event:sendMail", {
            to: email,
            subject: "Forgot Password",
            body: forgotPasswordMail({
                lastName: user.lastName,
                firstName: user.firstName,
                link: currentOrigin + token,
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
