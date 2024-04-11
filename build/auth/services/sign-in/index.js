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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
var core_1 = require("../../../core");
var common_1 = require("../../../core/common");
var token_1 = require("../../../auth/helpers/token");
var user_model_1 = require("../../../auth/model/user.model");
var SignIn = /** @class */ (function () {
    function SignIn(dbUser, tokenService) {
        var _this = this;
        this.dbUser = dbUser;
        this.tokenService = tokenService;
        /**
         * Handles user login, performs necessary validations, and generates tokens for authentication.
         *
         * @param {Context<SignInPayload>} params - The input parameters for user login.
         * @returns {Promise<ApiResponse>} The API response containing authentication tokens and user data.
         * @throws {UnAuthorizedError} Thrown if login credentials are invalid or user email is not verified.
         */
        this.handle = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var email, password, user, isPasswordValid, _c, generatedAccessToken, generatedRefreshToken, _d, dbPassword, refreshToken, refreshTokenExp, responsePayload;
            var input = _b.input;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        email = input.email, password = input.password;
                        return [4 /*yield*/, this.dbUser.findOne({
                                where: { email: email },
                            })];
                    case 1:
                        user = _e.sent();
                        if (!user)
                            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
                        return [4 /*yield*/, (0, core_1.compareHashedData)(password, user.password)];
                    case 2:
                        isPasswordValid = _e.sent();
                        if (!isPasswordValid)
                            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
                        if (user.role === "USER" && !user.isVerified)
                            throw new core_1.ForbiddenError(common_1.AppMessages.FAILURE.VERIFY_ACCOUNT);
                        return [4 /*yield*/, this.tokenService.getTokens({
                                id: user.id,
                                email: user.email,
                                role: user.role,
                            })];
                    case 3:
                        _c = _e.sent(), generatedAccessToken = _c[0], generatedRefreshToken = _c[1];
                        return [4 /*yield*/, this.dbUser.update({ refreshToken: generatedRefreshToken, refreshTokenExp: new Date() }, { where: { id: user.id } })];
                    case 4:
                        _e.sent();
                        core_1.logger.info("Logged In Successfully");
                        _d = user.dataValues, dbPassword = _d.password, refreshToken = _d.refreshToken, refreshTokenExp = _d.refreshTokenExp, responsePayload = __rest(_d, ["password", "refreshToken", "refreshTokenExp"]);
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                message: common_1.AppMessages.SUCCESS.LOGIN,
                                data: responsePayload,
                                headers: {
                                    "Set-Cookie": [
                                        "accessToken=".concat(generatedAccessToken, "; Path=/; HttpOnly; maxAge=900000; SameSite=strict"),
                                        "refreshToken=".concat(generatedRefreshToken, "; Path=/; HttpOnly; SameSite=strict"),
                                    ],
                                },
                            }];
                }
            });
        }); };
    }
    return SignIn;
}());
exports.signIn = new SignIn(user_model_1.Users, token_1.tokenService);
