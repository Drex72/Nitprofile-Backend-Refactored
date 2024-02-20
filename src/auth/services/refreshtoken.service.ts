import { type Context, convertArrayToObject, UnAuthorizedError, config, HttpStatus } from "@/core"
import type { RefreshTokenPayload } from "../payload_interfaces"
import { AppMessages } from "@/core/common"
import { Users } from "@/auth/model/user.model"
import { type TokenService, tokenService } from "../helpers/token"

class RefreshToken {
    constructor(private readonly dbUser: typeof Users, private readonly tokenService: TokenService) {}

    // Need to work on handling empty types

    handle = async ({ headers }: Context<RefreshTokenPayload>) => {
        const cookiesArr = headers.cookie?.split("; ")

        if (!cookiesArr || cookiesArr.length <= 0) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const cookies = convertArrayToObject(cookiesArr)

        const refreshToken = cookies?.refreshToken

        if (!refreshToken) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const payload = await this.tokenService.extractTokenDetails(refreshToken, config.auth.refreshTokenSecret)

        const [accessToken, newRefreshToken] = await this.tokenService.getTokens(payload)

        await this.dbUser.update({ refreshToken, refreshTokenExp: new Date() }, { where: { id: payload.id } })

        headers["set-cookie"] = [`accessToken=${accessToken}; Path=/; HttpOnly`, `refreshToken=${newRefreshToken}; Path=/; HttpOnly`]

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.TOKEN_REFRESHED,
        }
    }
}

export const refreshToken = new RefreshToken(Users, tokenService)
