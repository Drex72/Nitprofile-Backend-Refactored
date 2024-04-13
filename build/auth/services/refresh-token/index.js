"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const user_model_1 = require("@/auth/model/user.model");
const token_1 = require("@/auth/helpers/token");
const encryptor_1 = require("@/auth/helpers/encryptor");
class RefreshToken {
    constructor(dbUser, tokenService) {
        this.dbUser = dbUser;
        this.tokenService = tokenService;
        // Need to work on handling empty types
        this.handle = async ({ headers }) => {
            const cookiesArr = headers.cookie?.split("; ");
            if (!cookiesArr || cookiesArr.length <= 0)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const cookies = (0, core_1.convertArrayToObject)(cookiesArr);
            try {
                if (cookies?.accessToken) {
                    const decryptedAccessToken = encryptor_1.encryptor.decrypt(cookies?.accessToken);
                    const isAccessTokenValid = this.tokenService._verifyToken(decryptedAccessToken, core_1.config.auth.accessTokenSecret);
                    if (isAccessTokenValid) {
                        return {
                            code: core_1.HttpStatus.OK,
                            message: common_1.AppMessages.SUCCESS.TOKEN_REFRESHED,
                        };
                    }
                }
            }
            catch (error) { }
            const refreshToken = cookies?.refreshToken;
            if (!refreshToken)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const payload = await this.tokenService.extractTokenDetails(refreshToken, core_1.config.auth.refreshTokenSecret);
            const [newAccessToken, newRefreshToken] = await this.tokenService.getTokens({
                email: payload.email,
                id: payload.id,
                role: payload.role,
            });
            await this.dbUser.update({ refreshToken, refreshTokenExp: new Date() }, { where: { id: payload.id } });
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.TOKEN_REFRESHED,
                headers: {
                    "Set-Cookie": [`accessToken=${newAccessToken}; Path=/; HttpOnly`, `refreshToken=${newRefreshToken}; Path=/; HttpOnly`],
                },
            };
        };
    }
}
exports.refreshToken = new RefreshToken(user_model_1.Users, token_1.tokenService);
