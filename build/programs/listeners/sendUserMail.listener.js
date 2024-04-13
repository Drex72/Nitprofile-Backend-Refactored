"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewUserMail = void 0;
const core_1 = require("@/core");
const mails_1 = require("@/mails");
const models_1 = require("../models");
class SendUserEmail {
    constructor(dbUserPrograms) {
        this.dbUserPrograms = dbUserPrograms;
        this.handle = async (input) => {
            const sentMails = [];
            try {
                await Promise.all(input.map(async (user) => {
                    const { firstName, lastName, programName, token, email } = user;
                    const sentMail = (0, mails_1.sendEmail)({
                        to: email,
                        subject: "Confirmation Email",
                        body: (0, mails_1.programAcceptanceMail)({
                            lastName,
                            firstName,
                            programName,
                            link: `${core_1.currentOrigin}/auth/verify-account?token=${token}`,
                        }),
                    });
                    sentMails.push(sentMail);
                }));
                const results = await Promise.allSettled(sentMails);
                results.forEach((result) => {
                    if (result.status === "fulfilled") {
                        const user = input.find((item) => (item.email = result.value.to));
                        this.dbUserPrograms.update({ acceptanceMailSent: true }, { where: { userId: user?.userId, programId: user?.programId } });
                    }
                });
            }
            catch (error) {
                core_1.logger.error(error?.message);
                throw new Error("Internal Server Error");
            }
        };
    }
}
exports.sendNewUserMail = new SendUserEmail(models_1.UserPrograms);
