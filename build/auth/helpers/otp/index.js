"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpService = exports.OTPService = void 0;
class OTPService {
    /**
     * Generates a random OTP (One-Time Password).
     * @returns A randomly generated OTP as a number.
     */
    _createOtp() {
        const digits = "123456789";
        const otpLength = 4;
        const otpArray = Array.from({ length: otpLength }, () => +digits[Math.floor(Math.random() * digits.length)]);
        const otp = parseInt(otpArray.join(""), 10);
        return otp;
    }
    /**
     * Generates an expiration date for OTP.
     * @returns The expiration date for the OTP as a Date object.
     */
    _createOTPExp() {
        const expirationMinutes = 15;
        const expDate = new Date();
        expDate.setMinutes(expDate.getMinutes() + expirationMinutes);
        return expDate;
    }
    async generateOtp() {
        // Create the Otp
        const otp = this._createOtp();
        // Create the Exp Date
        const otpExp = this._createOTPExp();
        return {
            otp,
            otpExp,
        };
    }
}
exports.OTPService = OTPService;
exports.otpService = new OTPService();
