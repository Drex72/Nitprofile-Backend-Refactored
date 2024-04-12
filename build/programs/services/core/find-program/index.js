"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPrograms = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class FindPrograms {
    constructor(dbPrograms, dbAdminPrograms, dbUserPrograms) {
        this.dbPrograms = dbPrograms;
        this.dbAdminPrograms = dbAdminPrograms;
        this.dbUserPrograms = dbUserPrograms;
        this.findAll = async ({ query, user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const { programId } = query;
            const userRole = user?.role;
            if (programId)
                return this._findOne({
                    programId: programId,
                    userId: user.id,
                    userRole: userRole,
                });
            if (userRole === "ADMIN")
                return this._findForAdmins(user.id);
            if (userRole === "USER")
                return this._findForUsers(user.id);
            const allPrograms = await this.dbPrograms.findAll();
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                data: allPrograms,
            };
        };
        this._findOne = async (data) => {
            const { programId, userId, userRole } = data;
            if (userRole === "ADMIN") {
                const adminProgram = await this.dbAdminPrograms.findOne({
                    where: {
                        userId,
                        programId,
                    },
                });
                if (!adminProgram)
                    throw new core_1.ForbiddenError(common_1.AppMessages.FAILURE.FORBIDDEN_RESOURCE);
            }
            if (userRole === "USER") {
                const userProgram = await this.dbUserPrograms.findOne({
                    where: {
                        userId,
                        programId,
                    },
                });
                if (!userProgram)
                    throw new core_1.ForbiddenError(common_1.AppMessages.FAILURE.FORBIDDEN_RESOURCE);
            }
            const program = await this.dbPrograms.findOne({
                where: { id: programId },
            });
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                data: program,
            };
        };
        this._findForUsers = async (userId) => {
            const userPrograms = await this.dbUserPrograms.findAll({
                where: {
                    userId,
                },
            });
            const programs = [];
            await Promise.all(userPrograms.map(async (adminProgram) => {
                const program = await this.dbPrograms.findOne({
                    where: { id: adminProgram.programId },
                });
                if (program) {
                    programs.push(program);
                }
            }));
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                data: programs,
            };
        };
        this._findForAdmins = async (userId) => {
            console.log("finding for admin");
            const adminPrograms = await this.dbAdminPrograms.findAll({
                where: {
                    userId,
                },
            });
            const programs = [];
            await Promise.all(adminPrograms.map(async (adminProgram) => {
                const program = await this.dbPrograms.findOne({
                    where: { id: adminProgram.programId },
                });
                if (program) {
                    programs.push(program);
                }
            }));
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                data: programs,
            };
        };
    }
}
exports.findPrograms = new FindPrograms(models_1.Program, models_1.AdminsAssignedPrograms, models_1.UserPrograms);
