"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendUserMail = void 0;
const model_1 = require("@/auth/model");
const common_1 = require("@/core/common");
const core_1 = require("@/core");
const models_1 = require("@/programs/models");
const app_cache_1 = require("@/app/app-cache");
const mails_1 = require("@/mails");
class ResendUserMail {
    constructor(dbPrograms, dbUsers, dbUserPrograms) {
        this.dbPrograms = dbPrograms;
        this.dbUsers = dbUsers;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = async ({ input, query }) => {
            const { email } = input;
            const { programId } = query;
            const program = await this.dbPrograms.findOne({
                where: { id: programId },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            let existingUser = await this.dbUsers.findOne({
                where: { email },
            });
            if (!existingUser)
                throw new core_1.BadRequestError(`Invalid User -  ${email}`);
            const userProgramExists = await this.dbUserPrograms.findOne({
                where: { userId: existingUser.id, programId: program.id },
            });
            if (!userProgramExists)
                throw new core_1.BadRequestError("User is not registered for this program");
            const inviteToken = (0, core_1.generateRandStr)(64);
            await app_cache_1.cache.set(inviteToken, email, "EX", 6000);
            console.log(inviteToken, 'sent Token');
            const sentMail = await (0, mails_1.sendEmail)({
                to: email,
                subject: "Confirmation Email",
                body: (0, mails_1.programAcceptanceMail)({
                    lastName: existingUser.lastName,
                    firstName: existingUser.firstName,
                    programName: program.name,
                    link: `${core_1.currentOrigin}/auth/verify-account?token=${inviteToken}`,
                }),
            });
            if (!sentMail)
                throw new core_1.BadRequestError("Error Sending Mail");
            this.dbUserPrograms.update({ acceptanceMailSent: true }, { where: { userId: existingUser.id, programId } });
            return {
                code: core_1.HttpStatus.CREATED,
                message: `Mail Resent to ${email} Successfully`
            };
        };
    }
}
exports.resendUserMail = new ResendUserMail(models_1.Program, model_1.Users, models_1.UserPrograms);
