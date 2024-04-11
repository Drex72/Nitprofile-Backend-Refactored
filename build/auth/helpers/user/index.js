"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.create_user = void 0;
var common_1 = require("../../../core/common");
var core_1 = require("../../../core");
var user_model_1 = require("../../../auth/model/user.model");
var CreateUser = /** @class */ (function () {
    function CreateUser(dbUser) {
        var _this = this;
        this.dbUser = dbUser;
        /**
         * Creates a single user in the database.
         * @param {ICreateUser} input - The user data to create.
         * @returns {Promise<Users>} - The created user.
         * @throws {BadRequestError} - If the provided email already exists in the database.
         */
        this._create_single_user = function (input) { return __awaiter(_this, void 0, void 0, function () {
            var email, password, userExists, hashPassword, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = input.email, password = input.password;
                        return [4 /*yield*/, this.dbUser.findOne({
                                where: { email: email },
                            })];
                    case 1:
                        userExists = _a.sent();
                        if (userExists)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.EMAIL_EXISTS);
                        return [4 /*yield*/, (0, core_1.hashData)(password)
                            // Create the User
                        ];
                    case 2:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, this.dbUser.create(__assign(__assign({}, input), { password: hashPassword }))];
                    case 3:
                        newUser = _a.sent();
                        core_1.logger.info("User with ID ".concat(newUser.id, " created successfully"));
                        return [2 /*return*/, newUser];
                }
            });
        }); };
        /**
         * Creates multiple users in the database in a bulk transaction.
         * @param {ICreateUser[]} users - The array of user data to create.
         * @returns {Promise<Users[]>} - The array of created users.
         * @throws {Error} - If an error occurs during the creation process.
         */
        this._create_users_bulk = function (users) { return __awaiter(_this, void 0, void 0, function () {
            var dbTransaction, createdUsers, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.sequelize.transaction()];
                    case 1:
                        dbTransaction = _a.sent();
                        createdUsers = [];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, Promise.all(users.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var createdUser;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._create_single_user(user)];
                                        case 1:
                                            createdUser = _a.sent();
                                            createdUsers.push(createdUser);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        core_1.logger.info("Users created successfully");
                        dbTransaction.commit();
                        return [2 /*return*/, createdUsers];
                    case 4:
                        error_1 = _a.sent();
                        dbTransaction.rollback();
                        core_1.logger.error(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                        throw new Error("Error while creating Users");
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return CreateUser;
}());
exports.create_user = new CreateUser(user_model_1.Users);
