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
exports.UnProcessableError = void 0;
var utils_1 = require("../utils");
var apiError_1 = require("./apiError");
var UnProcessableError = /** @class */ (function (_super) {
    __extends(UnProcessableError, _super);
    function UnProcessableError(message) {
        var _this = _super.call(this, message) || this;
        _this._details = null;
        _this._statusCode = utils_1.HttpStatus.UNPROCESSABLE;
        _this._message = message;
        Object.setPrototypeOf(_this, UnProcessableError.prototype);
        return _this;
    }
    Object.defineProperty(UnProcessableError.prototype, "statusCode", {
        get: function () {
            return this._statusCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnProcessableError.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnProcessableError.prototype, "details", {
        get: function () {
            return this._details;
        },
        enumerable: false,
        configurable: true
    });
    return UnProcessableError;
}(apiError_1.ApiError));
exports.UnProcessableError = UnProcessableError;
;
