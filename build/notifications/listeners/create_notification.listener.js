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
exports.createNotification = void 0;
var core_1 = require("@/core");
var models_1 = require("@/notifications/models");
var user_model_1 = require("@/auth/model/user.model");
var web_socket_1 = require("@/web-socket");
var CreateNotification = /** @class */ (function () {
    function CreateNotification(dbNotificationEntity, dbNotifications, dbUsers) {
        var _this = this;
        this.dbNotificationEntity = dbNotificationEntity;
        this.dbNotifications = dbNotifications;
        this.dbUsers = dbUsers;
        this.handle = function (input) { return __awaiter(_this, void 0, void 0, function () {
            var actor, entity_type, item_id, message, notifier, currentNotificationEntityType, entity_type_id, actorExists, transaction, newNotifications, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!input)
                            throw new core_1.BadRequestError("No Input!");
                        actor = input.actor, entity_type = input.entity_type, item_id = input.item_id, message = input.message, notifier = input.notifier;
                        return [4 /*yield*/, this.dbNotificationEntity.findOne({
                                where: { name: entity_type },
                            })];
                    case 1:
                        currentNotificationEntityType = _a.sent();
                        if (!currentNotificationEntityType)
                            throw new core_1.BadRequestError("Invalid Notification Entity Type!");
                        entity_type_id = currentNotificationEntityType.id;
                        if (!(actor !== "SYSTEM")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dbUsers.findOne({ where: { id: actor.id } })];
                    case 2:
                        actorExists = _a.sent();
                        if (!actorExists)
                            throw new core_1.BadRequestError("Invalid Actor");
                        _a.label = 3;
                    case 3: return [4 /*yield*/, core_1.sequelize.transaction()];
                    case 4:
                        transaction = _a.sent();
                        newNotifications = [];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, Promise.all(notifier.map(function (notifier_id) { return __awaiter(_this, void 0, void 0, function () {
                                var notifierExists, notification, io, event_id;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.dbUsers.findOne({ where: { id: notifier_id } })];
                                        case 1:
                                            notifierExists = _a.sent();
                                            if (!notifierExists)
                                                throw new core_1.BadRequestError("Invalid Notifier");
                                            return [4 /*yield*/, this.dbNotifications.create({
                                                    actor: actor === "SYSTEM" ? undefined : actor.id,
                                                    entity_type_id: entity_type_id,
                                                    item_id: item_id,
                                                    notifier: notifier_id,
                                                    message: message,
                                                })];
                                        case 2:
                                            notification = _a.sent();
                                            newNotifications.push(notification);
                                            io = web_socket_1.Websocket.getInstance();
                                            event_id = "".concat(web_socket_1.WEBSOCKET_CONSTANT.NOTIFICATION.EVENTS.NEW_NOTIFICATION, ":").concat(notifier_id);
                                            console.log("event:", event_id);
                                            io.of(web_socket_1.WEBSOCKET_CONSTANT.NOTIFICATION.NAMESPACE).emit(event_id, {
                                                notification: notification,
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 6:
                        _a.sent();
                        transaction.commit();
                        core_1.logger.info("Notification Created Successfully: ".concat(JSON.stringify(newNotifications)));
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.CREATED,
                                data: newNotifications,
                                message: "Notification Created successfully",
                            }];
                    case 7:
                        error_1 = _a.sent();
                        transaction.rollback();
                        core_1.logger.error(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                        throw new Error("Internal Server Error");
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.validate_item_based_on_entity = function (item_id, entity_type) { };
    }
    return CreateNotification;
}());
exports.createNotification = new CreateNotification(models_1.NotificationEntity, models_1.Notifications, user_model_1.Users);
