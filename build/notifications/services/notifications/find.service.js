"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNotifications = void 0;
var core_1 = require("../../../core");
var common_1 = require("../../../core/common");
var models_1 = require("../../../notifications/models");
var FindNotifications = /** @class */ (function () {
    function FindNotifications(dbNotifications) {
        var _this = this;
        this.dbNotifications = dbNotifications;
        this.handle = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var allUserNotifications;
            var query = _b.query, user = _b.user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!user)
                            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
                        if (query === null || query === void 0 ? void 0 : query.notification_id)
                            return [2 /*return*/, this.singleNotification(query === null || query === void 0 ? void 0 : query.notification_id, user.id)];
                        return [4 /*yield*/, this.dbNotifications.findAll({
                                where: { notifier: user.id },
                            })];
                    case 1:
                        allUserNotifications = _c.sent();
                        core_1.logger.info("Notifications for ".concat(user.id, " Found"));
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                data: allUserNotifications,
                                message: "Notifications Found for User successfully",
                            }];
                }
            });
        }); };
        this.singleNotification = function (notification_id, user_id) { return __awaiter(_this, void 0, void 0, function () {
            var singleNotification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbNotifications.findOne({
                            where: { id: notification_id, notifier: user_id },
                        })];
                    case 1:
                        singleNotification = _a.sent();
                        if (!singleNotification)
                            throw new core_1.BadRequestError("Invalid Notification!");
                        core_1.logger.info("Notification for ".concat(user_id, " Found"));
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                data: singleNotification,
                                message: "Notification Found for user successfully",
                            }];
                }
            });
        }); };
    }
    return FindNotifications;
}());
exports.findNotifications = new FindNotifications(models_1.Notifications);
