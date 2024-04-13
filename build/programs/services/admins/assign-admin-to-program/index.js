"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignAdminToProgram = void 0;
const model_1 = require("@/auth/model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class AssignAdminToProgram {
    constructor(dbPrograms, dbAdminAssignedPrograms) {
        this.dbPrograms = dbPrograms;
        this.dbAdminAssignedPrograms = dbAdminAssignedPrograms;
        this.handle = async ({ input }) => {
            const { adminId, programId } = input;
            const programExists = await this.dbPrograms.findOne({
                where: { id: programId },
            });
            if (!programExists)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const existingUser = await model_1.Users.findOne({
                where: { id: adminId, role: "ADMIN" },
            });
            if (!existingUser)
                throw new core_1.UnAuthorizedError('This admin doesnt exist');
            const adminAssigned = await this.dbAdminAssignedPrograms.findOne({
                where: {
                    programId,
                    userId: adminId,
                },
            });
            if (adminAssigned)
                throw new core_1.UnAuthorizedError("Admin is already assigned to this program");
            await this.dbAdminAssignedPrograms.create({
                userId: adminId,
                programId,
            });
            const SUCCESS_MESSAGE = `Admin ${existingUser.firstName} assigned to program ${programExists.name} successfully`;
            core_1.logger.info(SUCCESS_MESSAGE);
            return {
                code: core_1.HttpStatus.CREATED,
                message: SUCCESS_MESSAGE,
            };
        };
    }
}
exports.assignAdminToProgram = new AssignAdminToProgram(models_1.Program, models_1.AdminsAssignedPrograms);
