"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgramNodes = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class GetProgramNodes {
    constructor(dbPrograms, dbProgramNodes) {
        this.dbPrograms = dbPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.handle = async ({ input, user, query }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const { programId, category } = query;
            if (!programId || !category)
                throw new core_1.BadRequestError("Invalid Params");
            const program = await this.dbPrograms.findOne({
                where: { id: programId },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const programNodes = await this.dbProgramNodes.findAll({
                where: {
                    programId,
                    category,
                },
            });
            return {
                code: core_1.HttpStatus.CREATED,
                message: common_1.AppMessages.SUCCESS.PROGRAM_NODE_FOUND,
                data: programNodes,
            };
        };
    }
}
exports.getProgramNodes = new GetProgramNodes(models_1.Program, models_1.ProgramNodes);
