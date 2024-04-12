"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteAdmin = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const user_model_1 = require("@/auth/model/user.model");
const app_1 = require("@/app");
const mails_1 = require("@/mails");
const app_cache_1 = require("@/app/app-cache");
class InviteAdmin {
    constructor(dbUser) {
        this.dbUser = dbUser;
        this.handle = async ({ input }) => {
            const { email } = input;
            const user = await this.dbUser.findOne({
                where: { email },
            });
            if (user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.EMAIL_EXISTS);
            const inviteToken = (0, core_1.generateRandStr)(64);
            await app_cache_1.cache.set(inviteToken, email, "EX", 1200);
            (0, app_1.dispatch)("event:sendMail", {
                to: email,
                subject: "NITProfile Admin Invitation",
                body: (0, mails_1.adminInvitationMail)({
                    link: `${core_1.currentOrigin}/auth/accept-admin-invitation?token=${inviteToken}`,
                }),
            });
            core_1.logger.info(`Admin with email ${email} invited successfully`);
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.ADMIN_INVITED,
            };
        };
    }
}
exports.inviteAdmin = new InviteAdmin(user_model_1.Users);
