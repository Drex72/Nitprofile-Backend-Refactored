"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProgramUsers = void 0;
const app_1 = require("@/app");
const app_cache_1 = require("@/app/app-cache");
const user_1 = require("@/auth/helpers/user");
const model_1 = require("@/auth/model");
const core_1 = require("@/core");
const common_1 = require("@/core/common");
const models_1 = require("@/programs/models");
const convert_csv_to_json_1 = __importDefault(require("convert-csv-to-json"));
const csvSchema = core_1.Joi.object({
    email: core_1.Joi.string().required().trim(),
    firstName: core_1.Joi.string().trim().required(),
    lastName: core_1.Joi.string().trim().required(),
});
class RegisterProgramUsers {
    constructor(dbPrograms, dbUsers, dbUserPrograms) {
        this.dbPrograms = dbPrograms;
        this.dbUsers = dbUsers;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = async ({ input, query, files }) => {
            const program = await this.dbPrograms.findOne({
                where: { id: query.programId },
            });
            if (!program)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
            const usersToCreate = [];
            const dbTransaction = await core_1.sequelize.transaction();
            const createdUsers = [];
            const singleUser = Object.keys(input).length > 0;
            try {
                if (singleUser) {
                    usersToCreate.push(input.user);
                }
                else {
                    if (!files || !files.csv || Array.isArray(files.csv))
                        throw new core_1.ForbiddenError("csv is required");
                    const convertedJson = (await convert_csv_to_json_1.default.fieldDelimiter(",").getJsonFromCsv(files.csv.tempFilePath));
                    usersToCreate.push(...convertedJson);
                }
                const sendMailPayload = [];
                await Promise.all(usersToCreate.map(async (user) => {
                    let value = csvSchema.validate(user);
                    if (value.error)
                        throw new core_1.BadRequestError(`Invalid User ${JSON.stringify(user)}`);
                    let existingUser = await this.dbUsers.findOne({
                        where: { email: user.email },
                    });
                    if (existingUser && existingUser.role !== "USER") {
                        throw new core_1.BadRequestError(`User with Email ${existingUser.email} already exists and is not a user`);
                    }
                    if (existingUser && existingUser.role === "USER") {
                        const userProgramExists = await this.dbUserPrograms.findOne({
                            where: { userId: existingUser.id, programId: program.id },
                        });
                        if (userProgramExists)
                            throw new core_1.BadRequestError(`User with Email ${existingUser.email} already exists in this program`);
                    }
                    if (!existingUser) {
                        existingUser = await user_1.create_user._create_single_user({
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            password: core_1.config.userDefaultPassword,
                            role: "USER",
                        });
                        core_1.logger.info(`User with ID ${existingUser.id} created successfully`);
                    }
                    createdUsers.push(existingUser);
                    await this.dbUserPrograms.create({
                        userId: existingUser.id,
                        programId: program.id,
                    }, { transaction: dbTransaction });
                    const inviteToken = (0, core_1.generateRandStr)(64);
                    await app_cache_1.cache.set(inviteToken, user.email, "EX", 6000);
                    sendMailPayload.push({
                        programName: program.name,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: inviteToken,
                        email: user.email,
                        userId: existingUser.id,
                        programId: program.id,
                    });
                    core_1.logger.info(`User with Name ${user.firstName} Registered for program ${program.name} successfully`);
                }));
                (0, app_1.dispatch)("event:sendNewUserMail", sendMailPayload);
                await dbTransaction.commit();
            }
            catch (error) {
                dbTransaction.rollback();
                core_1.logger.error(error?.message);
                throw new Error(error?.message ?? "Internal Server Error");
            }
            return {
                code: core_1.HttpStatus.CREATED,
                message: common_1.AppMessages.SUCCESS.USERS_REGISTERED_SUCCESSFULLY,
                data: singleUser ? createdUsers[0] : createdUsers,
            };
        };
        this._create_single_program_user = async (input) => {
            const { email, firstName, lastName, programId } = input;
            let existingUser = await this.dbUsers.findOne({
                where: { email },
            });
            if (existingUser) {
                const userProgramExists = await this.dbUserPrograms.findOne({
                    where: { userId: existingUser.id, programId },
                });
                if (userProgramExists)
                    throw new core_1.BadRequestError(`User with Email ${existingUser.email} already exists in this program`);
            }
            if (!existingUser) {
                existingUser = await user_1.create_user._create_single_user({
                    email,
                    firstName,
                    lastName,
                    password: core_1.config.userDefaultPassword,
                    role: "USER",
                });
                core_1.logger.info(`User with ID ${existingUser.id} created successfully`);
            }
            await this.dbUserPrograms.create({
                userId: existingUser.id,
                programId: programId,
            });
            return existingUser;
        };
    }
}
exports.registerProgramUsers = new RegisterProgramUsers(models_1.Program, model_1.Users, models_1.UserPrograms);
