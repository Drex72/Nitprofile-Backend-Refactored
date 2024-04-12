"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgram = void 0;
const model_1 = require("@/auth/model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class CreateProgram {
    constructor(dbPrograms) {
        this.dbPrograms = dbPrograms;
        this.handle = async ({ input, user }) => {
            const { endDate, name, startDate } = input;
            const programExists = await this.dbPrograms.findOne({
                where: { name },
            });
            if (programExists)
                throw new core_1.BadRequestError("Program with Name Already Exists!");
            const existingUser = await model_1.Users.findOne({
                where: { id: user?.id },
            });
            if (!existingUser)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            if (startDate < new Date(Date.now()))
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.START_DATE_ERROR);
            if (endDate < startDate)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.DATE_DURATION_ERROR);
            const createdProgram = await this.dbPrograms.create({ ...input, createdBy: existingUser?.id });
            core_1.logger.info(`Program with ID ${createdProgram.id} created successfully`);
            return {
                code: core_1.HttpStatus.CREATED,
                message: common_1.AppMessages.SUCCESS.PROGRAM_CREATED,
                data: createdProgram,
            };
        };
    }
}
exports.createProgram = new CreateProgram(models_1.Program);
