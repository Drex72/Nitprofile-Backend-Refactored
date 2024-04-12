"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeHolderTextConverter = void 0;
const model_1 = require("@/auth/model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class PlaceholderText {
    constructor(dbPrograms, dbUser) {
        this.dbPrograms = dbPrograms;
        this.dbUser = dbUser;
        this.convert_entity_placeholder = async (options) => {
            if (options.entity === "program") {
                return this._convert_program_entity_placeholder(options);
            }
            if (options.entity === "user") {
                return this._convert_user_entity_placeholder(options);
            }
            if (options.entity === "date") {
                return this._convert_date_entity_placeholder();
            }
        };
        this._convert_date_entity_placeholder = () => {
            return new Date().toLocaleDateString();
        };
        this._convert_user_entity_placeholder = async (options) => {
            const { userId } = options;
            const selectedUser = await this.dbUser.findOne({
                where: {
                    id: userId,
                },
            });
            if (!selectedUser)
                throw new core_1.BadRequestError("Invalid User");
            const key = options?.entity_key ?? "firstName";
            const value = selectedUser[key] ?? "Invalid Property";
            console.log(value, value.toString());
            return value.toString();
        };
        this._convert_program_entity_placeholder = async (options) => {
            const { programId } = options;
            const selectedProgram = await this.dbPrograms.findOne({
                where: {
                    id: programId,
                },
            });
            if (!selectedProgram)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const key = options?.entity_key ?? "name";
            const value = selectedProgram[key] ?? "Invalid Property";
            return value.toString();
        };
    }
}
exports.placeHolderTextConverter = new PlaceholderText(models_1.Program, model_1.Users);
