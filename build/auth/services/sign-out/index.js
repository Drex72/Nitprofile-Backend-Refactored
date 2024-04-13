"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core//common");
const user_model_1 = require("@/auth/model/user.model");
class SignOut {
    constructor(dbUsers) {
        this.dbUsers = dbUsers;
        /**
         * @description Destroys user session
         * @param {Context<SignOutPayload>} payload
         * @returns { code: string, message: string } response
         */
        this.handle = async ({ user }) => {
            await this.dbUsers.update({ refreshToken: "", refreshTokenExp: undefined }, { where: { id: user.id } });
            return {
                code: core_1.HttpStatus.NO_CONTENT,
                message: common_1.AppMessages.SUCCESS.LOGOUT,
                headers: {
                    "Set-Cookie": [`accessToken=; Path=/; HttpOnly`, `refreshToken=; Path=/; HttpOnly`],
                },
            };
        };
    }
}
exports.signOut = new SignOut(user_model_1.Users);
