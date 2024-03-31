"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieHandler = void 0;
var CookieHandler = /** @class */ (function () {
    function CookieHandler() {
    }
    CookieHandler.prototype.saveToHttpOnlyCookie = function (options) {
        var cookieName = options.cookieName, data = options.data, res = options.res;
        res.cookie(cookieName, data);
    };
    CookieHandler.prototype.clearHttpOnlyCookie = function (options) {
        var cookieName = options.cookieName, res = options.res;
        res.clearCookie(cookieName, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
    };
    return CookieHandler;
}());
exports.CookieHandler = CookieHandler;
