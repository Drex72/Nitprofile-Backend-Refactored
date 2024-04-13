"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgramNode = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class UpdateProgramNodes {
    constructor(dbProgramNodes) {
        this.dbProgramNodes = dbProgramNodes;
        this.handle = async ({ input, user, query }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const { node } = input;
            const { id } = query;
            const programNode = await this.dbProgramNodes.findOne({
                where: {
                    id,
                },
            });
            if (!programNode)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM_NODE);
            await this.dbProgramNodes.update({ ...node }, { where: { id } });
            core_1.logger.info(`Program Node with ID ${id} updated successfully`);
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.PROGRAM_NODE_UPDATED,
            };
        };
    }
}
exports.updateProgramNode = new UpdateProgramNodes(models_1.ProgramNodes);
