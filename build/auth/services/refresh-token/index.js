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
exports.refreshToken = void 0;
var core_1 = require("@/core");
var common_1 = require("@/core/common");
var user_model_1 = require("@/auth/model/user.model");
var token_1 = require("@/auth/helpers/token");
var encryptor_1 = require("@/auth/helpers/encryptor");
var RefreshToken = /** @class */ (function () {
    function RefreshToken(dbUser, tokenService) {
        var _this = this;
        this.dbUser = dbUser;
        this.tokenService = tokenService;
        // Need to work on handling empty types
        this.handle = function (_a) {
            var headers = _a.headers;
            return __awaiter(_this, void 0, void 0, function () {
                var cookiesArr, cookies, decryptedAccessToken, isAccessTokenValid, refreshToken, payload, _b, newAccessToken, newRefreshToken;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            cookiesArr = (_c = headers.cookie) === null || _c === void 0 ? void 0 : _c.split("; ");
                            if (!cookiesArr || cookiesArr.length <= 0)
                                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                            cookies = (0, core_1.convertArrayToObject)(cookiesArr);
                            try {
                                if (cookies === null || cookies === void 0 ? void 0 : cookies.accessToken) {
                                    decryptedAccessToken = encryptor_1.encryptor.decrypt(cookies === null || cookies === void 0 ? void 0 : cookies.accessToken);
                                    isAccessTokenValid = this.tokenService._verifyToken(decryptedAccessToken, core_1.config.auth.accessTokenSecret);
                                    if (isAccessTokenValid) {
                                        return [2 /*return*/, {
                                                code: core_1.HttpStatus.OK,
                                                message: common_1.AppMessages.SUCCESS.TOKEN_REFRESHED,
                                            }];
                                    }
                                }
                            }
                            catch (error) { }
                            refreshToken = cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken;
                            if (!refreshToken)
                                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                            return [4 /*yield*/, this.tokenService.extractTokenDetails(refreshToken, core_1.config.auth.refreshTokenSecret)];
                        case 1:
                            payload = _d.sent();
                            return [4 /*yield*/, this.tokenService.getTokens({
                                    email: payload.email,
                                    id: payload.id,
                                    role: payload.role,
                                })];
                        case 2:
                            _b = _d.sent(), newAccessToken = _b[0], newRefreshToken = _b[1];
                            return [4 /*yield*/, this.dbUser.update({ refreshToken: refreshToken, refreshTokenExp: new Date() }, { where: { id: payload.id } })];
                        case 3:
                            _d.sent();
                            return [2 /*return*/, {
                                    code: core_1.HttpStatus.OK,
                                    message: common_1.AppMessages.SUCCESS.TOKEN_REFRESHED,
                                    headers: {
                                        "Set-Cookie": ["accessToken=".concat(newAccessToken, "; Path=/; HttpOnly"), "refreshToken=".concat(newRefreshToken, "; Path=/; HttpOnly")],
                                    },
                                }];
                    }
                });
            });
        };
    }
    return RefreshToken;
}());
exports.refreshToken = new RefreshToken(user_model_1.Users, token_1.tokenService);