"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProfile = void 0;
const model_1 = require("@/auth/model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const formatNode_1 = require("@/programs/helpers/formatNode");
const models_1 = require("@/programs/models");
class GenerateProfile {
    constructor(dbPrograms, dbUserPrograms, dbProgramNodes, dbUser) {
        this.dbPrograms = dbPrograms;
        this.dbUserPrograms = dbUserPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.dbUser = dbUser;
        this.handle = async ({ query, user }) => {
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const { programId } = query;
            const userProgram = await this.dbUserPrograms.findOne({
                where: { userId: user.id, programId },
            });
            if (!userProgram)
                throw new core_1.BadRequestError("You are not registered for this program");
            const program = await this.dbPrograms.findOne({
                where: { id: programId },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const existingUser = await this.dbUser.findOne({ where: { id: user.id } });
            if (!existingUser)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const programNodes = await this.dbProgramNodes.scope("").findAll({
                where: { programId, category: "profile" },
            });
            if (!program.profileGenerationAvailable) {
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE);
            }
            const profilePictureNode = programNodes.find((node) => node.type === "image" && node.overlay);
            if (profilePictureNode && !existingUser.profilePicPublicId)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROFILE_PICTURE);
            let profile_url;
            if (userProgram.profileImageUrl && userProgram.profileImageUrl.length > 20)
                profile_url = userProgram.profileImageUrl;
            if (!userProgram.profileImageUrl || userProgram.profileImageUrl.length < 20 || existingUser.changed("profilePicSecureUrl")) {
                const refactoredNodes = [];
                await Promise.all(programNodes.map(async (node) => {
                    if (node.type === "image" && !node.overlay) {
                        node.overlay = existingUser.profilePicPublicId.replace(/\//g, ":");
                    }
                    const formattedNode = await formatNode_1.formatNode.format_node(node, {
                        programId: program.id,
                        userId: existingUser.id,
                    });
                    refactoredNodes.push(formattedNode);
                }));
                console.log({ refactoredNodes });
                profile_url = (0, core_1.generateCloudinaryTransformationImage)({
                    framePublicId: program.profileFramePublicId,
                    height: program.profileFrameHeight,
                    nodes: refactoredNodes,
                    width: program.profileFrameWidth,
                });
                userProgram.profileImageUrl = profile_url;
                userProgram.profileGenerationDate = new Date();
                await userProgram.save();
            }
            if (!profile_url)
                throw new core_1.BadRequestError("Could not Generate Profile, Please try again");
            core_1.logger.info(`Profile for User ${existingUser.id} Generated successfully`);
            return {
                code: core_1.HttpStatus.OK,
                message: "Profile for User Generated successfully",
                data: profile_url,
            };
        };
    }
}
exports.generateProfile = new GenerateProfile(models_1.Program, models_1.UserPrograms, models_1.ProgramNodes, model_1.Users);
