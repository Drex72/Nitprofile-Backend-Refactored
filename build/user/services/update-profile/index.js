"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const model_1 = require("@/auth/model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
class UpdateProfile {
    constructor(dbUser) {
        this.dbUser = dbUser;
        this.handle = async ({ input, user }) => {
            if (!input)
                throw new core_1.BadRequestError("No Input Passed");
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            const existingUser = await this.dbUser.findOne({ where: { id: user.id } });
            if (!existingUser)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
            await this.dbUser.update({ ...input }, {
                where: {
                    id: existingUser.id,
                },
            });
            core_1.logger.info(`User with ID ${existingUser.id} updated successfully`);
            return {
                code: core_1.HttpStatus.OK,
                message: "Profile Updated Successfully",
            };
        };
    }
}
exports.updateProfile = new UpdateProfile(model_1.Users);
