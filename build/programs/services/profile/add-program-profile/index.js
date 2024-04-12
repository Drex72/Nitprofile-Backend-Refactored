"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProgramProfileFrame = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
const fs_1 = __importDefault(require("fs"));
class AddProgramProfileFrame {
    constructor(dbPrograms) {
        this.dbPrograms = dbPrograms;
        this.handle = async ({ input, query, files }) => {
            if (!files || !files.frame || Array.isArray(files.frame))
                throw new core_1.ForbiddenError("Profile Frame is required");
            const { profileFrameHeight, profileFrameWidth } = input;
            const width = parseInt(profileFrameWidth);
            const height = parseInt(profileFrameHeight);
            const program = await this.dbPrograms.findOne({
                where: { id: query.programId },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const imageBuffer = fs_1.default.readFileSync(files.frame.tempFilePath);
            const profileFrame = { ...files.frame, data: imageBuffer };
            const uploadedImage = await core_1.imageUploadService.imageUpload(core_1.config.cloudinary.profileFrameFolder, profileFrame);
            if (!uploadedImage)
                throw new core_1.BadRequestError("Error while uploading Frame. Please Try again later");
            program.profileFrameHeight = height;
            program.profileFrameWidth = width;
            program.profileFramePublicId = uploadedImage.public_id;
            program.profileFrameSecureUrl = uploadedImage.secure_url;
            await program.save();
            core_1.logger.info(`Program with ID ${program.id} updated successfully`);
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.PROGRAM_UPDATED,
                data: program,
            };
        };
    }
}
exports.addProgramProfileFrame = new AddProgramProfileFrame(models_1.Program);
