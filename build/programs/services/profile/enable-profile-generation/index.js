"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableProfileGeneration = void 0;
const app_1 = require("@/app");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
const utils_1 = require("@/programs/utils");
class EnableProfileGeneration {
    constructor(dbAdminPrograms, dbPrograms, dbProgramNodes, dbUserPrograms) {
        this.dbAdminPrograms = dbAdminPrograms;
        this.dbPrograms = dbPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = async ({ user, query }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const { programId } = query;
            const program = await this.dbPrograms.findOne({ where: { id: programId } });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            if (program.profileGenerationAvailable) {
                return {
                    code: core_1.HttpStatus.OK,
                    message: common_1.AppMessages.SUCCESS.PROFILE_GENERATION_AVAILABLE,
                    data: program,
                };
            }
            if (!(0, utils_1.isProgramProfileValid)(program)) {
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE);
            }
            const assignedAdmins = await program?.getAssignedAdmins({
                attributes: {
                    exclude: ["refreshToken", "refreshTokenExp", "password"],
                },
            });
            const isAdminAssigned = assignedAdmins?.find((admin) => admin?.id === user.id) || program.createdBy === user.id;
            if (!isAdminAssigned)
                throw new core_1.ForbiddenError(common_1.AppMessages.FAILURE.FORBIDDEN_PROGRAM);
            const programNodes = await this.dbProgramNodes.findAll({ where: { programId } });
            if (!programNodes || programNodes.length === 0)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE);
            program.profileGenerationAvailable = true;
            await program.save();
            const programUsers = await this.dbUserPrograms.findAll({
                where: {
                    programId: query.programId,
                },
            });
            const users = programUsers.map((user) => user.id);
            (0, app_1.dispatch)("event:newNotification", {
                actor: { id: user.id },
                entity_type: "PROFILE_AVAILABLE",
                item_id: programId,
                message: `Profile Generation for Program ${program.name} is now Available.`,
                notifier: users,
            });
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.PROFILE_GENERATION_AVAILABLE,
                data: program,
            };
        };
    }
}
exports.enableProfileGeneration = new EnableProfileGeneration(models_1.AdminsAssignedPrograms, models_1.Program, models_1.ProgramNodes, models_1.UserPrograms);
