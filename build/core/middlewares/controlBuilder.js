"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlBuilder = void 0;
var controllerHandler_1 = require("./controllerHandler");
var ControlBuilder = /** @class */ (function () {
    function ControlBuilder() {
        this.availableOptions = {
            isPrivate: false,
            isPrivateAndPublic: false,
        };
        this.options = this.availableOptions;
    }
    ControlBuilder.builder = function () {
        return new ControlBuilder();
    };
    ControlBuilder.prototype.setHandler = function (func) {
        this.handler = func;
        return this;
    };
    ControlBuilder.prototype.setValidator = function (schema) {
        this.schema = schema;
        return this;
    };
    ControlBuilder.prototype.isPrivate = function () {
        this.options = __assign(__assign({}, this.options), { isPrivate: true });
        return this;
    };
    ControlBuilder.prototype.only = function () {
        var allowed = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowed[_i] = arguments[_i];
        }
        this.options = { isPrivate: true, allowedRoles: allowed };
        return this;
    };
    ControlBuilder.prototype.handle = function () {
        return new controllerHandler_1.ControllerHandler().handle(this.handler, this.schema, this.options);
    };
    return ControlBuilder;
}());
exports.ControlBuilder = ControlBuilder;
