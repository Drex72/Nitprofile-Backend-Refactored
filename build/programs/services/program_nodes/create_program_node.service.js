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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgramNodes = void 0;
var core_1 = require("../../../core");
var common_1 = require("../../../core/common");
var models_1 = require("../../../programs/models");
var utils_1 = require("../../../programs/utils");
var CreateProgramNodes = /** @class */ (function () {
    function CreateProgramNodes(dbPrograms, dbProgramNodes) {
        var _this = this;
        this.dbPrograms = dbPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.handle = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var nodes, category, programId, program, assignedAdmins, isAdminAssigned, dbTransaction, createdNodes, error_1;
            var _this = this;
            var _c;
            var input = _b.input, user = _b.user, query = _b.query;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!user)
                            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                        nodes = input.nodes, category = input.category;
                        programId = query.programId;
                        return [4 /*yield*/, this.dbPrograms.findOne({
                                where: { id: programId },
                            })];
                    case 1:
                        program = _d.sent();
                        if (!program)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
                        return [4 /*yield*/, (program === null || program === void 0 ? void 0 : program.getAssignedAdmins({
                                attributes: {
                                    exclude: ["refreshToken", "refreshTokenExp", "password"],
                                },
                            }))];
                    case 2:
                        assignedAdmins = _d.sent();
                        isAdminAssigned = (assignedAdmins === null || assignedAdmins === void 0 ? void 0 : assignedAdmins.find(function (admin) { return (admin === null || admin === void 0 ? void 0 : admin.id) === user.id; })) || program.createdBy === user.id;
                        if (!isAdminAssigned)
                            throw new core_1.ForbiddenError("You are not assigned to this program");
                        if (!(0, utils_1.isProgramProfileValid)(program)) {
                            throw new core_1.BadRequestError("Node creation for this program is restricted until a profile or certificate frame is created within the program.");
                        }
                        return [4 /*yield*/, core_1.sequelize.transaction()];
                    case 3:
                        dbTransaction = _d.sent();
                        createdNodes = [];
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, Promise.all(nodes.map(function (node) { return __awaiter(_this, void 0, void 0, function () {
                                var createdNode;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.dbProgramNodes.create(__assign(__assign({}, node), { programId: programId, category: category }), { transaction: dbTransaction })];
                                        case 1:
                                            createdNode = _a.sent();
                                            core_1.logger.info("Program Node with ID ".concat(createdNode.id, " created successfully"));
                                            createdNodes.push(createdNode);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        _d.sent();
                        dbTransaction.commit();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _d.sent();
                        dbTransaction.rollback();
                        core_1.logger.error(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                        throw new Error((_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _c !== void 0 ? _c : "Internal Server Error");
                    case 7: return [2 /*return*/, {
                            code: core_1.HttpStatus.CREATED,
                            message: common_1.AppMessages.SUCCESS.PROGRAM_NODE_CREATED,
                            data: createdNodes,
                        }];
                }
            });
        }); };
    }
    return CreateProgramNodes;
}());
exports.createProgramNodes = new CreateProgramNodes(models_1.Program, models_1.ProgramNodes);
