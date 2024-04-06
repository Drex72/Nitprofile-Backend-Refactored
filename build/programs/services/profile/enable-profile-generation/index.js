"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableProfileGeneration = void 0;
var app_1 = require("@/app");
var core_1 = require("@/core");
var common_1 = require("@/core/common");
var models_1 = require("@/programs/models");
var utils_1 = require("@/programs/utils");
var EnableProfileGeneration = /** @class */ (function () {
    function EnableProfileGeneration(dbAdminPrograms, dbPrograms, dbProgramNodes, dbUserPrograms) {
        var _this = this;
        this.dbAdminPrograms = dbAdminPrograms;
        this.dbPrograms = dbPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var programId, program, assignedAdmins, isAdminAssigned, programNodes, programUsers, users;
            var user = _b.user, query = _b.query;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!user)
                            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                        programId = query.programId;
                        return [4 /*yield*/, this.dbPrograms.findOne({ where: { id: programId } })];
                    case 1:
                        program = _c.sent();
                        if (!program)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
                        if (program.profileGenerationAvailable) {
                            return [2 /*return*/, {
                                    code: core_1.HttpStatus.OK,
                                    message: common_1.AppMessages.SUCCESS.PROFILE_GENERATION_AVAILABLE,
                                    data: program,
                                }];
                        }
                        if (!(0, utils_1.isProgramProfileValid)(program)) {
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE);
                        }
                        return [4 /*yield*/, (program === null || program === void 0 ? void 0 : program.getAssignedAdmins({
                                attributes: {
                                    exclude: ["refreshToken", "refreshTokenExp", "password"],
                                },
                            }))];
                    case 2:
                        assignedAdmins = _c.sent();
                        isAdminAssigned = (assignedAdmins === null || assignedAdmins === void 0 ? void 0 : assignedAdmins.find(function (admin) { return (admin === null || admin === void 0 ? void 0 : admin.id) === user.id; })) || program.createdBy === user.id;
                        if (!isAdminAssigned)
                            throw new core_1.ForbiddenError(common_1.AppMessages.FAILURE.FORBIDDEN_PROGRAM);
                        return [4 /*yield*/, this.dbProgramNodes.findAll({ where: { programId: programId } })];
                    case 3:
                        programNodes = _c.sent();
                        if (!programNodes || programNodes.length === 0)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE);
                        program.profileGenerationAvailable = true;
                        return [4 /*yield*/, program.save()];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, this.dbUserPrograms.findAll({
                                where: {
                                    programId: query.programId,
                                },
                            })];
                    case 5:
                        programUsers = _c.sent();
                        users = programUsers.map(function (user) { return user.id; });
                        (0, app_1.dispatch)("event:newNotification", {
                            actor: { id: user.id },
                            entity_type: "PROFILE_AVAILABLE",
                            item_id: programId,
                            message: "Profile Generation for Program ".concat(program.name, " is now Available."),
                            notifier: users,
                        });
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                message: common_1.AppMessages.SUCCESS.PROFILE_GENERATION_AVAILABLE,
                                data: program,
                            }];
                }
            });
        }); };
    }
    return EnableProfileGeneration;
}());
exports.enableProfileGeneration = new EnableProfileGeneration(models_1.AdminsAssignedPrograms, models_1.Program, models_1.ProgramNodes, models_1.UserPrograms);
