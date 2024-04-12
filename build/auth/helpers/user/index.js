"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_user = void 0;
const common_1 = require("@/core/common");
const core_1 = require("@/core");
const user_model_1 = require("@/auth/model/user.model");
class CreateUser {
    constructor(dbUser) {
        this.dbUser = dbUser;
        /**
         * Creates a single user in the database.
         * @param {ICreateUser} input - The user data to create.
         * @returns {Promise<Users>} - The created user.
         * @throws {BadRequestError} - If the provided email already exists in the database.
         */
        this._create_single_user = async (input) => {
            const { email, password } = input;
            const userExists = await this.dbUser.findOne({
                where: { email },
            });
            if (userExists)
                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.EMAIL_EXISTS);
            // Hash the Password
            const hashPassword = await (0, core_1.hashData)(password);
            // Create the User
            const newUser = await this.dbUser.create({ ...input, password: hashPassword });
            core_1.logger.info(`User with ID ${newUser.id} created successfully`);
            return newUser;
        };
        /**
         * Creates multiple users in the database in a bulk transaction.
         * @param {ICreateUser[]} users - The array of user data to create.
         * @returns {Promise<Users[]>} - The array of created users.
         * @throws {Error} - If an error occurs during the creation process.
         */
        this._create_users_bulk = async (users) => {
            const dbTransaction = await core_1.sequelize.transaction();
            const createdUsers = [];
            try {
                await Promise.all(users.map(async (user) => {
                    const createdUser = await this._create_single_user(user);
                    createdUsers.push(createdUser);
                }));
                core_1.logger.info(`Users created successfully`);
                dbTransaction.commit();
                return createdUsers;
            }
            catch (error) {
                dbTransaction.rollback();
                core_1.logger.error(error?.message);
                throw new Error("Error while creating Users");
            }
        };
    }
}
exports.create_user = new CreateUser(user_model_1.Users);
