"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgram = void 0;
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
class UpdateProgram {
    constructor(dbPrograms) {
        this.dbPrograms = dbPrograms;
        this.handle = async ({ input, query }) => {
            const { startDate, endDate } = input;
            const { programId } = query;
            const program = await this.dbPrograms.findOne({
                where: { id: programId },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            if (startDate || endDate) {
                this._validateDates({
                    dbEndDate: program.endDate,
                    dbStartDate: program.startDate,
                    requestEndDate: endDate,
                    requestStartDate: startDate,
                });
            }
            await this.dbPrograms.update(input, { where: { id: programId } });
            core_1.logger.info(`Program with ID ${programId} Updated successfully`);
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.PROGRAM_UPDATED,
            };
        };
        this._validateDates = (data) => {
            const { dbEndDate, dbStartDate, requestEndDate, requestStartDate } = data;
            if (requestStartDate && requestStartDate < new Date(Date.now())) {
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.START_DATE_ERROR);
            }
            if (requestStartDate && requestEndDate && dbEndDate < requestStartDate) {
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.DATE_DURATION_ERROR);
            }
            if (requestStartDate && !requestEndDate && dbEndDate < requestStartDate) {
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.DATE_DURATION_ERROR);
            }
            if (requestEndDate && !requestStartDate && dbEndDate < dbStartDate) {
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.DATE_DURATION_ERROR);
            }
        };
    }
}
exports.updateProgram = new UpdateProgram(models_1.Program);
