"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProgram = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class DeleteProgram {
    constructor(dbPrograms, dbProgramNodes, AdminPrograms, RegisteredProgramsUsers) {
        this.dbPrograms = dbPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.AdminPrograms = AdminPrograms;
        this.RegisteredProgramsUsers = RegisteredProgramsUsers;
        this.handle = async ({ query, user }) => {
            const { programId } = query;
            const programExists = await this.dbPrograms.findOne({
                where: { id: programId, createdBy: user?.id },
            });
            if (!programExists)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            await this.dbProgramNodes.destroy({
                where: {
                    programId,
                },
            });
            await this.AdminPrograms.destroy({
                where: {
                    programId,
                },
            });
            await this.RegisteredProgramsUsers.destroy({
                where: {
                    programId,
                },
            });
            await this.dbPrograms.destroy({
                where: { id: programId, createdBy: user?.id },
            });
            core_1.logger.info(`Program with ID ${programId} deleted successfully`);
            return {
                code: core_1.HttpStatus.NO_CONTENT,
                message: "Program was deleted Successfully",
            };
        };
    }
}
exports.deleteProgram = new DeleteProgram(models_1.Program, models_1.ProgramNodes, models_1.AdminsAssignedPrograms, models_1.UserPrograms);
