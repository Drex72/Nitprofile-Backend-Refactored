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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProgramUsers = void 0;
var app_1 = require("@/app");
var app_cache_1 = require("@/app/app-cache");
var user_1 = require("@/auth/helpers/user");
var model_1 = require("@/auth/model");
var core_1 = require("@/core");
var common_1 = require("@/core/common");
var models_1 = require("@/programs/models");
var convert_csv_to_json_1 = __importDefault(require("convert-csv-to-json"));
var csvSchema = core_1.Joi.object({
    email: core_1.Joi.string().required().trim(),
    firstName: core_1.Joi.string().trim().required(),
    lastName: core_1.Joi.string().trim().required(),
});
var RegisterProgramUsers = /** @class */ (function () {
    function RegisterProgramUsers(dbPrograms, dbUsers, dbUserPrograms) {
        var _this = this;
        this.dbPrograms = dbPrograms;
        this.dbUsers = dbUsers;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var program, usersToCreate, dbTransaction, createdUsers, singleUser, convertedJson, sendMailPayload_1, error_1;
            var _this = this;
            var _c;
            var input = _b.input, query = _b.query, files = _b.files;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.dbPrograms.findOne({
                            where: { id: query.programId },
                        })];
                    case 1:
                        program = _d.sent();
                        if (!program)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
                        usersToCreate = [];
                        return [4 /*yield*/, core_1.sequelize.transaction()];
                    case 2:
                        dbTransaction = _d.sent();
                        createdUsers = [];
                        singleUser = Object.keys(input).length > 0;
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 9, , 10]);
                        if (!singleUser) return [3 /*break*/, 4];
                        usersToCreate.push(input.user);
                        return [3 /*break*/, 6];
                    case 4:
                        if (!files || !files.csv || Array.isArray(files.csv))
                            throw new core_1.ForbiddenError("csv is required");
                        return [4 /*yield*/, convert_csv_to_json_1.default.fieldDelimiter(",").getJsonFromCsv(files.csv.tempFilePath)];
                    case 5:
                        convertedJson = (_d.sent());
                        usersToCreate.push.apply(usersToCreate, convertedJson);
                        _d.label = 6;
                    case 6:
                        sendMailPayload_1 = [];
                        return [4 /*yield*/, Promise.all(usersToCreate.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var value, existingUser, userProgramExists, inviteToken;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            value = csvSchema.validate(user);
                                            if (value.error)
                                                throw new core_1.BadRequestError("Invalid User ".concat(JSON.stringify(user)));
                                            return [4 /*yield*/, this.dbUsers.findOne({
                                                    where: { email: user.email },
                                                })];
                                        case 1:
                                            existingUser = _a.sent();
                                            if (existingUser && existingUser.role !== "USER") {
                                                throw new core_1.BadRequestError("User with Email ".concat(existingUser.email, " already exists and is not a user"));
                                            }
                                            if (!(existingUser && existingUser.role === "USER")) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.dbUserPrograms.findOne({
                                                    where: { userId: existingUser.id, programId: program.id },
                                                })];
                                        case 2:
                                            userProgramExists = _a.sent();
                                            if (userProgramExists)
                                                throw new core_1.BadRequestError("User with Email ".concat(existingUser.email, " already exists in this program"));
                                            _a.label = 3;
                                        case 3:
                                            if (!!existingUser) return [3 /*break*/, 5];
                                            return [4 /*yield*/, user_1.create_user._create_single_user({
                                                    email: user.email,
                                                    firstName: user.firstName,
                                                    lastName: user.lastName,
                                                    password: core_1.config.userDefaultPassword,
                                                    role: "USER",
                                                })];
                                        case 4:
                                            existingUser = _a.sent();
                                            core_1.logger.info("User with ID ".concat(existingUser.id, " created successfully"));
                                            _a.label = 5;
                                        case 5:
                                            createdUsers.push(existingUser);
                                            return [4 /*yield*/, this.dbUserPrograms.create({
                                                    userId: existingUser.id,
                                                    programId: program.id,
                                                }, { transaction: dbTransaction })];
                                        case 6:
                                            _a.sent();
                                            inviteToken = (0, core_1.generateRandStr)(64);
                                            return [4 /*yield*/, app_cache_1.cache.set(inviteToken, user.email, "EX", 6000)];
                                        case 7:
                                            _a.sent();
                                            sendMailPayload_1.push({
                                                programName: program.name,
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                token: inviteToken,
                                                email: user.email,
                                                userId: existingUser.id,
                                                programId: program.id,
                                            });
                                            core_1.logger.info("User with Name ".concat(user.firstName, " Registered for program ").concat(program.name, " successfully"));
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 7:
                        _d.sent();
                        (0, app_1.dispatch)("event:sendNewUserMail", sendMailPayload_1);
                        return [4 /*yield*/, dbTransaction.commit()];
                    case 8:
                        _d.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _d.sent();
                        dbTransaction.rollback();
                        core_1.logger.error(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                        throw new Error((_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _c !== void 0 ? _c : "Internal Server Error");
                    case 10: return [2 /*return*/, {
                            code: core_1.HttpStatus.CREATED,
                            message: common_1.AppMessages.SUCCESS.USERS_REGISTERED_SUCCESSFULLY,
                            data: singleUser ? createdUsers[0] : createdUsers,
                        }];
                }
            });
        }); };
        this._create_single_program_user = function (input) { return __awaiter(_this, void 0, void 0, function () {
            var email, firstName, lastName, programId, existingUser, userProgramExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = input.email, firstName = input.firstName, lastName = input.lastName, programId = input.programId;
                        return [4 /*yield*/, this.dbUsers.findOne({
                                where: { email: email },
                            })];
                    case 1:
                        existingUser = _a.sent();
                        if (!existingUser) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dbUserPrograms.findOne({
                                where: { userId: existingUser.id, programId: programId },
                            })];
                    case 2:
                        userProgramExists = _a.sent();
                        if (userProgramExists)
                            throw new core_1.BadRequestError("User with Email ".concat(existingUser.email, " already exists in this program"));
                        _a.label = 3;
                    case 3:
                        if (!!existingUser) return [3 /*break*/, 5];
                        return [4 /*yield*/, user_1.create_user._create_single_user({
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                password: core_1.config.userDefaultPassword,
                                role: "USER",
                            })];
                    case 4:
                        existingUser = _a.sent();
                        core_1.logger.info("User with ID ".concat(existingUser.id, " created successfully"));
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.dbUserPrograms.create({
                            userId: existingUser.id,
                            programId: programId,
                        })];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, existingUser];
                }
            });
        }); };
    }
    return RegisterProgramUsers;
}());
exports.registerProgramUsers = new RegisterProgramUsers(models_1.Program, model_1.Users, models_1.UserPrograms);
