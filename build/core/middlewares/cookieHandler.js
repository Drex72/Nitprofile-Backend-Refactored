"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieHandler = void 0;
class CookieHandler {
    saveToHttpOnlyCookie(options) {
        const { cookieName, data, res } = options;
        res.cookie(cookieName, data);
    }
    clearHttpOnlyCookie(options) {
        const { cookieName, res } = options;
        res.clearCookie(cookieName, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
    }
}
exports.CookieHandler = CookieHandler;
