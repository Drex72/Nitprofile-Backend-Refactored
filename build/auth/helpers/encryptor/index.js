"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptor = exports.Encryptor = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var core_1 = require("@/core");
var Encryptor = /** @class */ (function () {
    function Encryptor(encryptorSecretKey) {
        if (encryptorSecretKey === void 0) { encryptorSecretKey = core_1.config.auth.encryptorSecretKey; }
        var _this = this;
        this.encryptorSecretKey = encryptorSecretKey;
        this.encrypt = function (item) {
            return crypto_js_1.default.AES.encrypt(item, _this.encryptorSecretKey).toString();
        };
    }
    Encryptor.prototype.decrypt = function (encryptedString) {
        return crypto_js_1.default.AES.decrypt(encryptedString, this.encryptorSecretKey).toString(crypto_js_1.default.enc.Utf8);
    };
    return Encryptor;
}());
exports.Encryptor = Encryptor;
exports.encryptor = new Encryptor();
