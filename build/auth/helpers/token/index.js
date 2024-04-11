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
exports.tokenService = exports.TokenService = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var common_1 = require("../../../core/common");
var core_1 = require("../../../core");
var encryptor_1 = require("../encryptor");
var TokenService = /** @class */ (function () {
    function TokenService(encryptor) {
        this.encryptor = encryptor;
    }
    TokenService.prototype.getTokens = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([this._generateAccessToken(data), this._generateRefreshToken(data)])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenService.prototype.extractTokenDetails = function (encryptedToken, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var decryptedToken, tokenDetails, tokenPayload;
            return __generator(this, function (_a) {
                decryptedToken = this.encryptor.decrypt(encryptedToken);
                tokenDetails = this._verifyToken(decryptedToken, secret);
                tokenPayload = tokenDetails;
                return [2 /*return*/, tokenPayload];
            });
        });
    };
    TokenService.prototype._verifyToken = function (token, secret) {
        try {
            jsonwebtoken_1.default.verify(token, secret);
            return jsonwebtoken_1.default.decode(token);
        }
        catch (err) {
            core_1.logger.error(err);
            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
        }
    };
    TokenService.prototype._generateAccessToken = function (data) {
        var _a = core_1.config.auth, accessTokenExpiresIn = _a.accessTokenExpiresIn, accessTokenSecret = _a.accessTokenSecret;
        var accessToken = this._generateToken({
            data: data,
            secret: accessTokenSecret,
            expiresIn: accessTokenExpiresIn,
        });
        return this.encryptor.encrypt(accessToken);
    };
    TokenService.prototype._generateRefreshToken = function (data) {
        var _a = core_1.config.auth, refreshTokenExpiresIn = _a.refreshTokenExpiresIn, refreshTokenSecret = _a.refreshTokenSecret;
        var refreshToken = this._generateToken({
            data: data,
            secret: refreshTokenSecret,
            expiresIn: refreshTokenExpiresIn,
        });
        return this.encryptor.encrypt(refreshToken);
    };
    TokenService.prototype._generateToken = function (_a) {
        var data = _a.data, secret = _a.secret, expiresIn = _a.expiresIn;
        return jsonwebtoken_1.default.sign(data, secret, {
            expiresIn: expiresIn,
            jwtid: crypto.randomUUID(),
        });
    };
    return TokenService;
}());
exports.TokenService = TokenService;
exports.tokenService = new TokenService(encryptor_1.encryptor);
