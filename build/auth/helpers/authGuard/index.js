"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const core_1 = require("@/core");
const token_1 = require("../token");
class AuthGuard {
    constructor(tokenService) {
        this.tokenService = tokenService;
        this.guard = async (cookies) => {
            const cookieAccessToken = cookies?.accessToken;
            if (!cookieAccessToken)
                return false;
            const { accessTokenSecret } = core_1.config.auth;
            const user = await this.tokenService.extractTokenDetails(cookieAccessToken, accessTokenSecret);
            if (!user)
                return false;
            return user;
        };
    }
}
exports.authGuard = new AuthGuard(token_1.tokenService);
