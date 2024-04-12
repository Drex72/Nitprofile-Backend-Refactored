"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserAccount = void 0;
const app_cache_1 = require("@/app/app-cache");
const user_model_1 = require("@/auth/model/user.model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
class VerifyAccount {
    constructor(dbUser) {
        this.dbUser = dbUser;
        this.handle = async ({ input }) => {
            const { token, password } = input;
            const email = await app_cache_1.cache.get(token);
            if (!email)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            await app_cache_1.cache.del(token);
            const user = await this.dbUser.findOne({
                where: { email, role: "USER" },
            });
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            const hashPassword = await (0, core_1.hashData)(password);
            await this.dbUser.update({ isVerified: true, password: hashPassword }, { where: { id: user.id } });
            core_1.logger.info("Verified User Successfully");
            return {
                code: core_1.HttpStatus.OK,
                message: "User Verified Successfully",
            };
        };
    }
}
exports.verifyUserAccount = new VerifyAccount(user_model_1.Users);
