"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptor = exports.Encryptor = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const core_1 = require("@/core");
class Encryptor {
    constructor(encryptorSecretKey = core_1.config.auth.encryptorSecretKey) {
        this.encryptorSecretKey = encryptorSecretKey;
        this.encrypt = (item) => {
            return crypto_js_1.default.AES.encrypt(item, this.encryptorSecretKey).toString();
        };
    }
    decrypt(encryptedString) {
        return crypto_js_1.default.AES.decrypt(encryptedString, this.encryptorSecretKey).toString(crypto_js_1.default.enc.Utf8);
    }
}
exports.Encryptor = Encryptor;
exports.encryptor = new Encryptor();
