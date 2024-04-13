"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const app_1 = require("@/app");
const user_model_1 = require("@/auth/model/user.model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const mails_1 = require("@/mails");
class ForgotPassword {
    constructor(dbUser) {
        this.dbUser = dbUser;
        this.handle = async ({ input }) => {
            const { email } = input;
            const user = await this.dbUser.findOne({ where: { email } });
            if (!user) {
                return {
                    code: core_1.HttpStatus.OK,
                    message: `${common_1.AppMessages.SUCCESS.EMAIL_SENT} ${email}`,
                };
            }
            const token = (0, core_1.generateRandStr)(64);
            user.resetToken = token;
            const expDate = (0, core_1.computeExpiryDate)(1800);
            user.resetTokenExpiresIn = expDate;
            await user.save();
            (0, app_1.dispatch)("event:sendMail", {
                to: email,
                subject: "Forgot Password",
                body: (0, mails_1.forgotPasswordMail)({
                    lastName: user.lastName,
                    firstName: user.firstName,
                    link: `${core_1.currentOrigin}/auth/reset-password?resetToken=${token}`,
                }),
            });
            core_1.logger.info("Successfully Sent Mail");
            return {
                code: core_1.HttpStatus.OK,
                message: `${common_1.AppMessages.SUCCESS.EMAIL_SENT} ${email}`,
            };
        };
    }
}
exports.forgotPassword = new ForgotPassword(user_model_1.Users);
