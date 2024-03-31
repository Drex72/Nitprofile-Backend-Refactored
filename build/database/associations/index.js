"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSetAssociations = void 0;
var model_1 = require("@/auth/model");
var models_1 = require("@/programs/models");
var handleSetAssociations = function () {
    model_1.Users.hasMany(models_1.Program, { foreignKey: "createdBy", as: "program" });
    models_1.Program.belongsTo(model_1.Users, { foreignKey: "createdBy", as: "user" });
    model_1.Users.belongsToMany(models_1.Program, {
        through: models_1.UserPrograms,
    });
    models_1.Program.belongsToMany(model_1.Users, {
        through: models_1.UserPrograms,
        foreignKey: "programId",
        otherKey: "userId",
        as: "registeredUsers",
    });
    models_1.Program.belongsToMany(model_1.Users, {
        through: models_1.AdminsAssignedPrograms,
        foreignKey: "programId",
        otherKey: "userId",
        as: "assignedAdmins",
    });
};
exports.handleSetAssociations = handleSetAssociations;
