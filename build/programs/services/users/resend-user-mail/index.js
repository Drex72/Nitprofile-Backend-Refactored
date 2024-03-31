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
exports.resendUserMail = void 0;
var model_1 = require("@/auth/model");
var common_1 = require("@/core/common");
var core_1 = require("@/core");
var models_1 = require("@/programs/models");
var app_cache_1 = require("@/app/app-cache");
var mails_1 = require("@/mails");
var ResendUserMail = /** @class */ (function () {
    function ResendUserMail(dbPrograms, dbUsers, dbUserPrograms) {
        var _this = this;
        this.dbPrograms = dbPrograms;
        this.dbUsers = dbUsers;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = function (_a) {
            var input = _a.input, query = _a.query;
            return __awaiter(_this, void 0, void 0, function () {
                var email, programId, program, existingUser, userProgramExists, inviteToken, sentMail;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            email = input.email;
                            programId = query.programId;
                            return [4 /*yield*/, this.dbPrograms.findOne({
                                    where: { id: programId },
                                })];
                        case 1:
                            program = _b.sent();
                            if (!program)
                                throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
                            return [4 /*yield*/, this.dbUsers.findOne({
                                    where: { email: email },
                                })];
                        case 2:
                            existingUser = _b.sent();
                            if (!existingUser)
                                throw new core_1.BadRequestError("Invalid User -  ".concat(email));
                            return [4 /*yield*/, this.dbUserPrograms.findOne({
                                    where: { userId: existingUser.id, programId: program.id },
                                })];
                        case 3:
                            userProgramExists = _b.sent();
                            if (!userProgramExists)
                                throw new core_1.BadRequestError("User is not registered for this program");
                            inviteToken = (0, core_1.generateRandStr)(64);
                            return [4 /*yield*/, app_cache_1.cache.set(inviteToken, email, "EX", 6000)];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, (0, mails_1.sendEmail)({
                                    to: email,
                                    subject: "Confirmation Email",
                                    body: (0, mails_1.programAcceptanceMail)({
                                        lastName: existingUser.lastName,
                                        firstName: existingUser.firstName,
                                        programName: program.name,
                                        link: "".concat(core_1.currentOrigin, "/?token=").concat(inviteToken),
                                    }),
                                })];
                        case 5:
                            sentMail = _b.sent();
                            if (!sentMail)
                                throw new core_1.BadRequestError("Error Sending Mail");
                            this.dbUserPrograms.update({ acceptanceMailSent: true }, { where: { userId: existingUser.id, programId: programId } });
                            return [2 /*return*/, {
                                    code: core_1.HttpStatus.CREATED,
                                    message: "Mail Resent to ".concat(email, " Successfully")
                                }];
                    }
                });
            });
        };
    }
    return ResendUserMail;
}());
exports.resendUserMail = new ResendUserMail(models_1.Program, model_1.Users, models_1.UserPrograms);
