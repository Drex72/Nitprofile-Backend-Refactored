import { type Context, ForbiddenError, HttpStatus } from "@/core"
import { AppMessages } from "@/core//common"
import { Users } from "../model"
import type { SignOutPayload } from "@/auth/payload_interfaces"

class SignOut {
    constructor(private readonly dbUsers: typeof Users) {}

    /**
     * @description Destroys user session
     * @param {Context<SignOutPayload>} payload
     * @returns { code: string, message: string } response
     */
    public handle = async ({ user, headers }: Context<SignOutPayload>) => {
        // get the auth token
        const tokenHeader = headers.authorization!

        if (!tokenHeader) throw new ForbiddenError(AppMessages.INFO.EMPTY_TOKEN_HEADER)

        await this.dbUsers.update({ refreshToken: "" }, { where: { id: user.id } })

        headers["set-cookie"] = [`accessToken=; Path=/; max-age=0; HttpOnly`, `refreshToken=; Path=/; max-age=0; HttpOnly`]

        return {
            code: HttpStatus.NO_CONTENT,
            message: AppMessages.SUCCESS.LOGOUT,
        }
    }
}

export const signOut = new SignOut(Users)
