"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedError = void 0;
var utils_1 = require("../utils");
var apiError_1 = require("./apiError");
var UnAuthorizedError = /** @class */ (function (_super) {
    __extends(UnAuthorizedError, _super);
    function UnAuthorizedError(message, details) {
        var _this = _super.call(this, message) || this;
        _this._statusCode = utils_1.HttpStatus.UNAUTHORIZED;
        _this._details = null;
        _this._message = message;
        _this._statusCode = utils_1.HttpStatus.UNAUTHORIZED;
        Object.setPrototypeOf(_this, UnAuthorizedError.prototype);
        return _this;
    }
    Object.defineProperty(UnAuthorizedError.prototype, "statusCode", {
        get: function () {
            return this._statusCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAuthorizedError.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAuthorizedError.prototype, "details", {
        get: function () {
            return this._details;
        },
        enumerable: false,
        configurable: true
    });
    return UnAuthorizedError;
}(apiError_1.ApiError));
exports.UnAuthorizedError = UnAuthorizedError;
