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
exports.formatNode = void 0;
var placeholderText_1 = require("../placeholderText");
var FormatNode = /** @class */ (function () {
    function FormatNode() {
        var _this = this;
        this.format_node = function (node, options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (node.type === "image")
                    return [2 /*return*/, this._format_image_node(node)];
                if (node.type === "text" && node.placeholder)
                    return [2 /*return*/, this._format_placeholder_node(node, options)];
                if (node.type === "text")
                    return [2 /*return*/, this._format_text_node(node)];
                return [2 /*return*/];
            });
        }); };
        this._format_image_node = function (node) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var refactoredNode = {
                overlay: (_a = node.overlay) !== null && _a !== void 0 ? _a : undefined,
                width: (_b = node.width) !== null && _b !== void 0 ? _b : undefined,
                height: (_c = node.height) !== null && _c !== void 0 ? _c : undefined,
                gravity: (_d = node.gravity) !== null && _d !== void 0 ? _d : undefined,
                radius: (_e = node.radius) !== null && _e !== void 0 ? _e : undefined,
                crop: (_f = node.crop) !== null && _f !== void 0 ? _f : undefined,
                x: (_g = node.x) !== null && _g !== void 0 ? _g : undefined,
                y: (_h = node.y) !== null && _h !== void 0 ? _h : undefined,
            };
            return refactoredNode;
        };
        this._format_text_node = function (node) {
            var _a, _b, _c, _d, _e, _f;
            var refactoredNode = {
                overlay: {
                    text: (_a = node.text) !== null && _a !== void 0 ? _a : undefined,
                    font_family: (_b = node.font_family) !== null && _b !== void 0 ? _b : undefined,
                    font_size: (_c = node.font_size) !== null && _c !== void 0 ? _c : undefined,
                    font_weight: (_d = node.font_weight) !== null && _d !== void 0 ? _d : undefined,
                },
                x: node.x,
                y: node.y,
                gravity: (_e = node.gravity) !== null && _e !== void 0 ? _e : undefined,
                color: (_f = node.color) !== null && _f !== void 0 ? _f : undefined,
            };
            return refactoredNode;
        };
        this._format_placeholder_node = function (node, options) { return __awaiter(_this, void 0, void 0, function () {
            var programId, userId, value, refactoredNode;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        programId = options.programId, userId = options.userId;
                        return [4 /*yield*/, placeholderText_1.placeHolderTextConverter.convert_entity_placeholder({
                                programId: programId,
                                userId: userId,
                                entity: node.entity,
                                entity_key: node.entity_key,
                            })];
                    case 1:
                        value = _f.sent();
                        refactoredNode = {
                            overlay: {
                                text: value !== null && value !== void 0 ? value : undefined,
                                font_family: (_a = node.font_family) !== null && _a !== void 0 ? _a : undefined,
                                font_size: (_b = node.font_size) !== null && _b !== void 0 ? _b : undefined,
                                font_weight: (_c = node.font_weight) !== null && _c !== void 0 ? _c : undefined,
                            },
                            x: node.x,
                            y: node.y,
                            gravity: (_d = node.gravity) !== null && _d !== void 0 ? _d : undefined,
                            color: (_e = node.color) !== null && _e !== void 0 ? _e : undefined,
                        };
                        return [2 /*return*/, refactoredNode];
                }
            });
        }); };
    }
    return FormatNode;
}());
exports.formatNode = new FormatNode();
