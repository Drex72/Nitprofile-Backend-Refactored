"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewProfile = void 0;
const model_1 = require("@/auth/model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const formatNode_1 = require("@/programs/helpers/formatNode");
const models_1 = require("@/programs/models");
class PreviewProfile {
    constructor(dbPrograms, dbAdminPrograms, dbProgramNodes, dbUser) {
        this.dbPrograms = dbPrograms;
        this.dbAdminPrograms = dbAdminPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.dbUser = dbUser;
        this.handle = async ({ query, user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const { programId } = query;
            const adminProgram = await this.dbAdminPrograms.findOne({
                where: { userId: user.id, programId },
            });
            if (!adminProgram && user.role !== "SUPER ADMIN")
                throw new core_1.BadRequestError("You are not registered for this program");
            const program = await this.dbPrograms.findOne({
                where: { id: programId },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const programNodes = await this.dbProgramNodes.scope("").findAll({
                where: { programId, category: "profile" },
            });
            const existingUser = await this.dbUser.findOne({ where: { id: user.id } });
            if (!existingUser)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            if (!program.profileFrameSecureUrl)
                throw new core_1.BadRequestError("No Profile Frame Uploaded!");
            let profile_url;
            if (!programNodes.length) {
                profile_url = program.profileFrameSecureUrl;
            }
            if (programNodes.length) {
                const refactoredNodes = [];
                await Promise.all(programNodes.map(async (node) => {
                    if (node.type === "image" && !node.overlay) {
                        node.overlay = `Nithub/NITPROFILE_ASSETS/DUMMYAVATAR-1960922999`.replace(/\//g, ":");
                    }
                    const formattedNode = await formatNode_1.formatNode.format_node(node, {
                        programId: program.id,
                        userId: user.id,
                    });
                    refactoredNodes.push(formattedNode);
                }));
                profile_url = (0, core_1.generateCloudinaryTransformationImage)({
                    framePublicId: program.profileFramePublicId,
                    height: program.profileFrameHeight,
                    nodes: refactoredNodes,
                    width: program.profileFrameWidth,
                });
            }
            core_1.logger.info(`Profile for Program ${program.id} Previewed successfully`);
            return {
                code: core_1.HttpStatus.OK,
                message: "Profile for User Previewed successfully",
                data: profile_url,
            };
        };
    }
}
exports.previewProfile = new PreviewProfile(models_1.Program, models_1.AdminsAssignedPrograms, models_1.ProgramNodes, model_1.Users);
