"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const token_1 = require("@/auth/helpers/token");
const user_model_1 = require("@/auth/model/user.model");
class SignIn {
    constructor(dbUser, tokenService) {
        this.dbUser = dbUser;
        this.tokenService = tokenService;
        /**
         * Handles user login, performs necessary validations, and generates tokens for authentication.
         *
         * @param {Context<SignInPayload>} params - The input parameters for user login.
         * @returns {Promise<ApiResponse>} The API response containing authentication tokens and user data.
         * @throws {UnAuthorizedError} Thrown if login credentials are invalid or user email is not verified.
         */
        this.handle = async ({ input }) => {
            const { email, password } = input;
            const user = await this.dbUser.findOne({
                where: { email },
            });
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            const isPasswordValid = await (0, core_1.compareHashedData)(password, user.password);
            if (!isPasswordValid)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            if (user.role === "USER" && !user.isVerified)
                throw new core_1.ForbiddenError(common_1.AppMessages.FAILURE.VERIFY_ACCOUNT);
            const [generatedAccessToken, generatedRefreshToken] = await this.tokenService.getTokens({
                id: user.id,
                email: user.email,
                role: user.role,
            });
            await this.dbUser.update({ refreshToken: generatedRefreshToken, refreshTokenExp: new Date() }, { where: { id: user.id } });
            core_1.logger.info("Logged In Successfully");
            const { password: dbPassword, refreshToken, refreshTokenExp, ...responsePayload } = user.dataValues;
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.LOGIN,
                data: responsePayload,
                headers: {
                    "Set-Cookie": [
                        `accessToken=${generatedAccessToken}; Path=/; HttpOnly; maxAge=900000; SameSite=strict`,
                        `refreshToken=${generatedRefreshToken}; Path=/; HttpOnly; SameSite=strict`,
                    ],
                },
            };
        };
    }
}
exports.signIn = new SignIn(user_model_1.Users, token_1.tokenService);
