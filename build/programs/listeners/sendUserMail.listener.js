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
exports.sendNewUserMail = void 0;
var core_1 = require("@/core");
var mails_1 = require("@/mails");
var models_1 = require("../models");
var SendUserEmail = /** @class */ (function () {
    function SendUserEmail(dbUserPrograms) {
        var _this = this;
        this.dbUserPrograms = dbUserPrograms;
        this.handle = function (input) { return __awaiter(_this, void 0, void 0, function () {
            var sentMails, results, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sentMails = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Promise.all(input.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var firstName, lastName, programName, token, email, sentMail;
                                return __generator(this, function (_a) {
                                    firstName = user.firstName, lastName = user.lastName, programName = user.programName, token = user.token, email = user.email;
                                    sentMail = (0, mails_1.sendEmail)({
                                        to: email,
                                        subject: "Confirmation Email",
                                        body: (0, mails_1.programAcceptanceMail)({
                                            lastName: lastName,
                                            firstName: firstName,
                                            programName: programName,
                                            link: core_1.currentOrigin + token,
                                        }),
                                    });
                                    sentMails.push(sentMail);
                                    return [2 /*return*/];
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Promise.allSettled(sentMails)];
                    case 3:
                        results = _a.sent();
                        results.forEach(function (result) {
                            if (result.status === "fulfilled") {
                                var user = input.find(function (item) { return (item.email = result.value.to); });
                                _this.dbUserPrograms.update({ acceptanceMailSent: true }, { where: { userId: user === null || user === void 0 ? void 0 : user.userId, programId: user === null || user === void 0 ? void 0 : user.programId } });
                            }
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        core_1.logger.error(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                        throw new Error("Internal Server Error");
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return SendUserEmail;
}());
exports.sendNewUserMail = new SendUserEmail(models_1.UserPrograms);
