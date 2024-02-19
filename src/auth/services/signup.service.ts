import { AppMessages } from "@/core/common"
import { HttpStatus, type Context } from "@/core"
import type { SignUpPayload } from "@/auth/payload_interfaces"
import { create_user } from "../helpers/user"

class SignUp {
    /**
     * @description Authenticates users and generates token for them
     * @throws {UnAuthorizedError} error
     * @param {Context<SignInPayload>} params
     * @returns
     */
    adminSignup = async ({ input }: Context<SignUpPayload>) => {
        const { email, firstName, lastName, password, token, otherName } = input

        const newUser = await create_user._create_single_user({ email, firstName, lastName, password, role: "ADMIN", otherName })

        return {
            code: HttpStatus.OK,
            data: newUser,
            message: AppMessages.SUCCESS.SIGNUP,
        }
    }
}

export const signUp = new SignUp()
