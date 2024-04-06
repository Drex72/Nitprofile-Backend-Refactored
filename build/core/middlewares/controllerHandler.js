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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerHandler = void 0;
var core_1 = require("@/core");
var authGuard_1 = require("@/auth/helpers/authGuard");
var common_1 = require("../common");
var ControllerHandler = /** @class */ (function () {
    function ControllerHandler() {
        var _this = this;
        this.handle = function (controllerFn, schema, options) {
            if (schema === void 0) { schema = {}; }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var controllerArgs, input, params, query, querySchema, paramsSchema, inputSchema, controllerResult, code, headers, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            if (!(options === null || options === void 0 ? void 0 : options.isPrivate)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.validateRequest({
                                    options: options,
                                    user: req.user,
                                    cookies: req.cookies,
                                    callbackFn: function (user) {
                                        req.user = user;
                                    },
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            controllerArgs = core_1.parseControllerArgs.parse(req);
                            input = controllerArgs.input, params = controllerArgs.params, query = controllerArgs.query;
                            if (schema) {
                                querySchema = schema.querySchema, paramsSchema = schema.paramsSchema, inputSchema = schema.inputSchema;
                                try {
                                    if (inputSchema)
                                        (0, core_1.joiValidate)(inputSchema, input);
                                    if (querySchema)
                                        (0, core_1.joiValidate)(querySchema, query);
                                    if (paramsSchema)
                                        (0, core_1.joiValidate)(paramsSchema, params);
                                }
                                catch (error) {
                                    throw new core_1.UnProcessableError(error.message.replaceAll('"', ""));
                                }
                            }
                            return [4 /*yield*/, controllerFn(controllerArgs)];
                        case 3:
                            controllerResult = _a.sent();
                            if (!controllerResult) {
                                res.status(core_1.HttpStatus.OK).send({ status: true });
                                return [2 /*return*/];
                            }
                            code = controllerResult.code, headers = controllerResult.headers, data = __rest(controllerResult, ["code", "headers"]);
                            res.set(__assign({}, headers))
                                .status(code !== null && code !== void 0 ? code : core_1.HttpStatus.OK)
                                .send(data);
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            core_1.logger.error("error ".concat(error_1));
                            next(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        };
    }
    ControllerHandler.prototype.validateRequest = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var callbackFn, cookies, options, user, isRequestAllowed, isRequestAuthorized;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        callbackFn = data.callbackFn, cookies = data.cookies, options = data.options, user = data.user;
                        if (user && user.id && (user === null || user === void 0 ? void 0 : user.role))
                            return [2 /*return*/];
                        return [4 /*yield*/, authGuard_1.authGuard.guard(cookies)];
                    case 1:
                        isRequestAllowed = _b.sent();
                        if (!isRequestAllowed)
                            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
                        if (options.allowedRoles && options.allowedRoles.length > 0) {
                            isRequestAuthorized = (_a = options.allowedRoles) === null || _a === void 0 ? void 0 : _a.includes(isRequestAllowed.role.toLocaleUpperCase());
                            if (!isRequestAuthorized)
                                throw new core_1.ForbiddenError("You do not have access to the requested resource");
                        }
                        callbackFn(isRequestAllowed);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ControllerHandler;
}());
exports.ControllerHandler = ControllerHandler;
