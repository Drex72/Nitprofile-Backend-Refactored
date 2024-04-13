"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgramMetrics = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class GetProgramMetrics {
    constructor(dbPrograms, dbUserPrograms) {
        this.dbPrograms = dbPrograms;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = async ({ query, user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const program = await this.dbPrograms.findOne({
                where: {
                    id: query.programId,
                },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const noOfProfilesGenerated = await this.dbUserPrograms.count({
                where: {
                    profileGenerationDate: {
                        $ne: null,
                    },
                },
            });
            const noOfCertificatesGenerated = await this.dbUserPrograms.count({
                where: {
                    certificateGenerationDate: {
                        $ne: null,
                    },
                },
            });
            const programUsers = await program?.getRegisteredUsers({
                attributes: {
                    exclude: ["refreshToken", "refreshTokenExp", "password"],
                },
            });
            const noOfVerifiedUsers = programUsers.filter((item) => item.isVerified).length;
            console.log(noOfCertificatesGenerated, noOfProfilesGenerated, noOfVerifiedUsers);
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                data: { noOfProfilesGenerated, noOfVerifiedUsers, noOfCertificatesGenerated },
            };
        };
    }
}
exports.getProgramMetrics = new GetProgramMetrics(models_1.Program, models_1.UserPrograms);
