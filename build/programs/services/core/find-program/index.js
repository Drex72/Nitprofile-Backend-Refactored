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
exports.findPrograms = void 0;
var core_1 = require("@/core");
var common_1 = require("@/core/common");
var models_1 = require("@/programs/models");
var FindPrograms = /** @class */ (function () {
    function FindPrograms(dbPrograms, dbAdminPrograms, dbUserPrograms) {
        var _this = this;
        this.dbPrograms = dbPrograms;
        this.dbAdminPrograms = dbAdminPrograms;
        this.dbUserPrograms = dbUserPrograms;
        this.findAll = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var programId, userRole, allPrograms;
            var query = _b.query, user = _b.user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!user)
                            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                        programId = query.programId;
                        userRole = user === null || user === void 0 ? void 0 : user.role;
                        if (programId)
                            return [2 /*return*/, this._findOne({
                                    programId: programId,
                                    userId: user.id,
                                    userRole: userRole,
                                })];
                        if (userRole === "ADMIN")
                            return [2 /*return*/, this._findForAdmins(user.id)];
                        if (userRole === "USER")
                            return [2 /*return*/, this._findForUsers(user.id)];
                        return [4 /*yield*/, this.dbPrograms.findAll()];
                    case 1:
                        allPrograms = _c.sent();
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                                data: allPrograms,
                            }];
                }
            });
        }); };
        this._findOne = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var programId, userId, userRole, adminProgram, userProgram, program;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programId = data.programId, userId = data.userId, userRole = data.userRole;
                        if (!(userRole === "ADMIN")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dbAdminPrograms.findOne({
                                where: {
                                    userId: userId,
                                    programId: programId,
                                },
                            })];
                    case 1:
                        adminProgram = _a.sent();
                        if (!adminProgram)
                            throw new core_1.ForbiddenError(common_1.AppMessages.FAILURE.FORBIDDEN_RESOURCE);
                        _a.label = 2;
                    case 2:
                        if (!(userRole === "USER")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.dbUserPrograms.findOne({
                                where: {
                                    userId: userId,
                                    programId: programId,
                                },
                            })];
                    case 3:
                        userProgram = _a.sent();
                        if (!userProgram)
                            throw new core_1.ForbiddenError(common_1.AppMessages.FAILURE.FORBIDDEN_RESOURCE);
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.dbPrograms.findOne({
                            where: { id: programId },
                        })];
                    case 5:
                        program = _a.sent();
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                                data: program,
                            }];
                }
            });
        }); };
        this._findForUsers = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var userPrograms, programs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbUserPrograms.findAll({
                            where: {
                                userId: userId,
                            },
                        })];
                    case 1:
                        userPrograms = _a.sent();
                        programs = [];
                        return [4 /*yield*/, Promise.all(userPrograms.map(function (adminProgram) { return __awaiter(_this, void 0, void 0, function () {
                                var program;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.dbPrograms.findOne({
                                                where: { id: adminProgram.programId },
                                            })];
                                        case 1:
                                            program = _a.sent();
                                            if (program) {
                                                programs.push(program);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                                data: programs,
                            }];
                }
            });
        }); };
        this._findForAdmins = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var adminPrograms, programs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("finding for admin");
                        return [4 /*yield*/, this.dbAdminPrograms.findAll({
                                where: {
                                    userId: userId,
                                },
                            })];
                    case 1:
                        adminPrograms = _a.sent();
                        programs = [];
                        return [4 /*yield*/, Promise.all(adminPrograms.map(function (adminProgram) { return __awaiter(_this, void 0, void 0, function () {
                                var program;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.dbPrograms.findOne({
                                                where: { id: adminProgram.programId },
                                            })];
                                        case 1:
                                            program = _a.sent();
                                            if (program) {
                                                programs.push(program);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                message: common_1.AppMessages.SUCCESS.DATA_FETCHED,
                                data: programs,
                            }];
                }
            });
        }); };
    }
    return FindPrograms;
}());
exports.findPrograms = new FindPrograms(models_1.Program, models_1.AdminsAssignedPrograms, models_1.UserPrograms);
