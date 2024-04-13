"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const user_model_1 = require("@/auth/model/user.model");
class ResetPassword {
    constructor(dbUser) {
        this.dbUser = dbUser;
        this.handle = async ({ input }) => {
            const { password, resetToken } = input;
            const user = await this.dbUser.findOne({ where: { resetToken } });
            if (!user)
                throw new core_1.ForbiddenError("Invalid or Expired token");
            if (!user.resetToken || !user.resetTokenExpiresIn || (0, core_1.isDateExpired)(user?.resetTokenExpiresIn)) {
                throw new core_1.ForbiddenError("Token Expired, request a new password reset mail");
            }
            const hashedPassword = await (0, core_1.hashData)(password);
            user.password = hashedPassword;
            user.resetToken = null;
            user.resetTokenExpiresIn = null;
            await user.save();
            core_1.logger.info("Successfully Reset Password");
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.PASSWORD_RESET,
            };
        };
    }
}
exports.resetPassword = new ResetPassword(user_model_1.Users);
