import { HttpStatus, compareHashedData, logger, type Context, UnAuthorizedError } from "@/core"
import type { SignInPayload } from "../payload_interfaces"
import { AppMessages } from "@/core/common"
import { tokenService, type TokenService } from "../helpers/token"
import type { Users as IUsers } from "../model"
import { Users } from "../model"

class SignIn {
    constructor(private readonly dbUser: typeof IUsers, private readonly tokenService: TokenService) {}

    /**
     * Handles user login, performs necessary validations, and generates tokens for authentication.
     *
     * @param {Context<SignInPayload>} params - The input parameters for user login.
     * @returns {Promise<ApiResponse>} The API response containing authentication tokens and user data.
     * @throws {UnAuthorizedError} Thrown if login credentials are invalid or user email is not verified.
     */

    handle = async ({ input, headers }: Context<SignInPayload>) => {
        const { email, password } = input

        const user = await this.dbUser.findOne({
            where: { email },
        })

        if (!user) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_CREDENTIALS)

        const isPasswordValid = await compareHashedData(password, user.password)

        if (!isPasswordValid) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_CREDENTIALS)

        const [accessToken, refreshToken] = await this.tokenService.getTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        })

        await this.dbUser.update({ refreshToken, refreshTokenExp: new Date() }, { where: { email } })

        headers["set-cookie"] = [`accessToken=${accessToken}; Path=/; HttpOnly`, `refreshToken=${refreshToken}; Path=/; HttpOnly`]

        logger.info("Logged In Successfully")

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.LOGIN,
            data: user,
        }
    }
}

export const signIn = new SignIn(Users, tokenService)
