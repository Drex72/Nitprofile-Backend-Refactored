"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("@/core/common");
const core_1 = require("@/core");
const encryptor_1 = require("../encryptor");
class TokenService {
    constructor(encryptor) {
        this.encryptor = encryptor;
    }
    async getTokens(data) {
        return await Promise.all([this._generateAccessToken(data), this._generateRefreshToken(data)]);
    }
    async extractTokenDetails(encryptedToken, secret) {
        const decryptedToken = this.encryptor.decrypt(encryptedToken);
        // verify the token
        const tokenDetails = this._verifyToken(decryptedToken, secret);
        // extract the token information
        let tokenPayload = tokenDetails;
        return tokenPayload;
    }
    _verifyToken(token, secret) {
        try {
            jsonwebtoken_1.default.verify(token, secret);
            return jsonwebtoken_1.default.decode(token);
        }
        catch (err) {
            core_1.logger.error(err);
            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
        }
    }
    _generateAccessToken(data) {
        const { accessTokenExpiresIn, accessTokenSecret } = core_1.config.auth;
        const accessToken = this._generateToken({
            data,
            secret: accessTokenSecret,
            expiresIn: accessTokenExpiresIn,
        });
        return this.encryptor.encrypt(accessToken);
    }
    _generateRefreshToken(data) {
        const { refreshTokenExpiresIn, refreshTokenSecret } = core_1.config.auth;
        const refreshToken = this._generateToken({
            data,
            secret: refreshTokenSecret,
            expiresIn: refreshTokenExpiresIn,
        });
        return this.encryptor.encrypt(refreshToken);
    }
    _generateToken({ data, secret, expiresIn }) {
        return jsonwebtoken_1.default.sign(data, secret, {
            expiresIn,
            jwtid: crypto.randomUUID(),
        });
    }
}
exports.TokenService = TokenService;
exports.tokenService = new TokenService(encryptor_1.encryptor);
