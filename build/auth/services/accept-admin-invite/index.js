"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptInvitation = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const user_1 = require("@/auth/helpers/user");
const app_cache_1 = require("@/app/app-cache");
class AcceptInvitation {
    constructor() {
        this.handle = async ({ input, query }) => {
            const { token } = query;
            const email = await app_cache_1.cache.get(token);
            if (!email)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const created_user = await user_1.create_user._create_single_user({ ...input, email, role: "ADMIN", isVerified: true });
            await app_cache_1.cache.del(token);
            core_1.logger.info(`User with email ${email} invited successfully`);
            const { password, refreshToken, refreshTokenExp, ...responsePayload } = created_user.dataValues;
            return {
                code: core_1.HttpStatus.CREATED,
                message: `User with email ${email} invited successfully`,
                data: responsePayload,
            };
        };
    }
}
exports.acceptInvitation = new AcceptInvitation();
