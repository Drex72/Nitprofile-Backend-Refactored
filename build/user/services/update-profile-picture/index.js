"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePicture = void 0;
const model_1 = require("@/auth/model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const fs_1 = __importDefault(require("fs"));
class UpdateProfilePicture {
    constructor(dbUser) {
        this.dbUser = dbUser;
        this.handle = async ({ files, user }) => {
            if (!files || !files.pfp || Array.isArray(files.pfp))
                throw new core_1.ForbiddenError("Profile Image is required");
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const existingUser = await this.dbUser.findOne({ where: { id: user.id } });
            if (!existingUser)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const imageBuffer = fs_1.default.readFileSync(files.pfp.tempFilePath);
            const profilePicture = { ...files.pfp, data: imageBuffer };
            const uploadedImage = await core_1.imageUploadService.imageUpload(core_1.config.cloudinary.assetsFolder, profilePicture);
            if (!uploadedImage)
                throw new core_1.BadRequestError("Error while updating Profile Picture. Please Try again later");
            existingUser.profilePicPublicId = uploadedImage.public_id;
            existingUser.profilePicSecureUrl = uploadedImage.secure_url;
            await existingUser.save();
            core_1.logger.info(`User with ID ${existingUser.id} updated successfully`);
            return {
                code: core_1.HttpStatus.OK,
                message: "Profile Pic Updated Successfully",
                data: {
                    publicId: uploadedImage.public_id,
                    secureUrl: uploadedImage.secure_url,
                },
            };
        };
    }
}
exports.updateProfilePicture = new UpdateProfilePicture(model_1.Users);
