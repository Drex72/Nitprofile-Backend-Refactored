"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgramNodes = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
const utils_1 = require("@/programs/utils");
class CreateProgramNodes {
    constructor(dbPrograms, dbProgramNodes) {
        this.dbPrograms = dbPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.handle = async ({ input, user, query }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const { nodes, category } = input;
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
            const isAdminAssigned = assignedAdmins?.find((admin) => admin?.id === user.id) || program.createdBy === user.id;
            if (!isAdminAssigned)
                throw new core_1.ForbiddenError("You are not assigned to this program");
            if (!(0, utils_1.isProgramProfileValid)(program)) {
                throw new core_1.BadRequestError("Node creation for this program is restricted until a profile or certificate frame is created within the program.");
            }
            const dbTransaction = await core_1.sequelize.transaction();
            const createdNodes = [];
            try {
                await Promise.all(nodes.map(async (node) => {
                    const createdNode = await this.dbProgramNodes.create({ ...node, programId, category }, { transaction: dbTransaction });
                    core_1.logger.info(`Program Node with ID ${createdNode.id} created successfully`);
                    createdNodes.push(createdNode);
                }));
                dbTransaction.commit();
            }
            catch (error) {
                dbTransaction.rollback();
                core_1.logger.error(error?.message);
                throw new Error(error?.message ?? "Internal Server Error");
            }
            return {
                code: core_1.HttpStatus.CREATED,
                message: common_1.AppMessages.SUCCESS.PROGRAM_NODE_CREATED,
                data: createdNodes,
            };
        };
    }
}
exports.createProgramNodes = new CreateProgramNodes(models_1.Program, models_1.ProgramNodes);
