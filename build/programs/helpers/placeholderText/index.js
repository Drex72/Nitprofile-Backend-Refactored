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
exports.placeHolderTextConverter = void 0;
var model_1 = require("../../../auth/model");
var core_1 = require("../../../core");
var common_1 = require("../../../core/common");
var models_1 = require("../../../programs/models");
var PlaceholderText = /** @class */ (function () {
    function PlaceholderText(dbPrograms, dbUser) {
        var _this = this;
        this.dbPrograms = dbPrograms;
        this.dbUser = dbUser;
        this.convert_entity_placeholder = function (options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (options.entity === "program") {
                    return [2 /*return*/, this._convert_program_entity_placeholder(options)];
                }
                if (options.entity === "user") {
                    return [2 /*return*/, this._convert_user_entity_placeholder(options)];
                }
                if (options.entity === "date") {
                    return [2 /*return*/, this._convert_date_entity_placeholder()];
                }
                return [2 /*return*/];
            });
        }); };
        this._convert_date_entity_placeholder = function () {
            return new Date().toLocaleDateString();
        };
        this._convert_user_entity_placeholder = function (options) { return __awaiter(_this, void 0, void 0, function () {
            var userId, selectedUser, key, value;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userId = options.userId;
                        return [4 /*yield*/, this.dbUser.findOne({
                                where: {
                                    id: userId,
                                },
                            })];
                    case 1:
                        selectedUser = _c.sent();
                        if (!selectedUser)
                            throw new core_1.BadRequestError("Invalid User");
                        key = (_a = options === null || options === void 0 ? void 0 : options.entity_key) !== null && _a !== void 0 ? _a : "firstName";
                        value = (_b = selectedUser[key]) !== null && _b !== void 0 ? _b : "Invalid Property";
                        console.log(value, value.toString());
                        return [2 /*return*/, value.toString()];
                }
            });
        }); };
        this._convert_program_entity_placeholder = function (options) { return __awaiter(_this, void 0, void 0, function () {
            var programId, selectedProgram, key, value;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        programId = options.programId;
                        return [4 /*yield*/, this.dbPrograms.findOne({
                                where: {
                                    id: programId,
                                },
                            })];
                    case 1:
                        selectedProgram = _c.sent();
                        if (!selectedProgram)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
                        key = (_a = options === null || options === void 0 ? void 0 : options.entity_key) !== null && _a !== void 0 ? _a : "name";
                        value = (_b = selectedProgram[key]) !== null && _b !== void 0 ? _b : "Invalid Property";
                        return [2 /*return*/, value.toString()];
                }
            });
        }); };
    }
    return PlaceholderText;
}());
exports.placeHolderTextConverter = new PlaceholderText(models_1.Program, model_1.Users);
