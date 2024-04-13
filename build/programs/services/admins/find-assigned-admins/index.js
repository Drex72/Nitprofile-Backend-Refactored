"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProgramAssignedAdmins = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class FindAssignedAdmins {
    constructor(dbPrograms) {
        this.dbPrograms = dbPrograms;
        this.handle = async ({ query }) => {
            const { programId } = query;
            const program = await this.dbPrograms.findOne({
                where: { id: programId },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const assignedAdmins = await program?.getAssignedAdmins({
                attributes: {
                    exclude: ["refreshToken", "refreshTokenExp", "password"],
                },
            });
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                data: assignedAdmins ?? [],
            };
        };
    }
}
exports.findProgramAssignedAdmins = new FindAssignedAdmins(models_1.Program);
