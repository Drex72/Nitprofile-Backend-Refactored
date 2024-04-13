"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDbConnection = void 0;
const associations_1 = require("../../database/associations");
const core_1 = require("@/core");
const initializeDbConnection = async () => {
    await core_1.sequelize.authenticate();
    core_1.logger.info("Connection has been established successfully.");
    core_1.logger.info("All models were synchronized successfully.");
    (0, associations_1.handleSetAssociations)();
    core_1.logger.info("Associations Set Successfully");
};
exports.initializeDbConnection = initializeDbConnection;
