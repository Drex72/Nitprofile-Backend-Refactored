"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProgramUsers = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class FindProgramUsers {
    constructor(dbPrograms, dbUserPrograms) {
        this.dbPrograms = dbPrograms;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = async ({ user, query }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const program = await this.dbPrograms.findOne({
                where: {
                    id: query.programId,
                },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const programUsers = await program?.getRegisteredUsers({
                where: {
                    role: "USER",
                },
                attributes: {
                    exclude: ["refreshToken", "refreshTokenExp", "password"],
                },
            });
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                data: programUsers ?? [],
            };
        };
        this.findUser = async ({ user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const userPrograms = await this.dbUserPrograms.findAll({
                where: {
                    userId: user?.id,
                },
            });
            console.log(userPrograms);
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                data: userPrograms ?? [],
            };
        };
    }
}
exports.findProgramUsers = new FindProgramUsers(models_1.Program, models_1.UserPrograms);
