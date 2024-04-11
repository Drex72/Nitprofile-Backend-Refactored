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
exports.generateProfile = void 0;
var model_1 = require("../../../../auth/model");
var core_1 = require("../../../../core");
var common_1 = require("../../../../core/common");
var formatNode_1 = require("../../../../programs/helpers/formatNode");
var models_1 = require("../../../../programs/models");
var GenerateProfile = /** @class */ (function () {
    function GenerateProfile(dbPrograms, dbUserPrograms, dbProgramNodes, dbUser) {
        var _this = this;
        this.dbPrograms = dbPrograms;
        this.dbUserPrograms = dbUserPrograms;
        this.dbProgramNodes = dbProgramNodes;
        this.dbUser = dbUser;
        this.handle = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var programId, userProgram, program, existingUser, programNodes, profilePictureNode, profile_url, refactoredNodes_1;
            var _this = this;
            var query = _b.query, user = _b.user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!user)
                            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                        programId = query.programId;
                        return [4 /*yield*/, this.dbUserPrograms.findOne({
                                where: { userId: user.id, programId: programId },
                            })];
                    case 1:
                        userProgram = _c.sent();
                        if (!userProgram)
                            throw new core_1.BadRequestError("You are not registered for this program");
                        return [4 /*yield*/, this.dbPrograms.findOne({
                                where: { id: programId },
                            })];
                    case 2:
                        program = _c.sent();
                        if (!program)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROGRAM);
                        return [4 /*yield*/, this.dbUser.findOne({ where: { id: user.id } })];
                    case 3:
                        existingUser = _c.sent();
                        if (!existingUser)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                        return [4 /*yield*/, this.dbProgramNodes.scope("").findAll({
                                where: { programId: programId, category: "profile" },
                            })];
                    case 4:
                        programNodes = _c.sent();
                        if (!program.profileGenerationAvailable) {
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.PROFILE_GENERATION_NOT_AVAILABLE);
                        }
                        profilePictureNode = programNodes.find(function (node) { return node.type === "image" && node.overlay; });
                        if (profilePictureNode && !existingUser.profilePicPublicId)
                            throw new core_1.BadRequestError(common_1.AppMessages.FAILURE.INVALID_PROFILE_PICTURE);
                        if (userProgram.profileImageUrl && userProgram.profileImageUrl.length > 20)
                            profile_url = userProgram.profileImageUrl;
                        if (!(!userProgram.profileImageUrl || userProgram.profileImageUrl.length < 20 || existingUser.changed("profilePicSecureUrl"))) return [3 /*break*/, 7];
                        refactoredNodes_1 = [];
                        return [4 /*yield*/, Promise.all(programNodes.map(function (node) { return __awaiter(_this, void 0, void 0, function () {
                                var formattedNode;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (node.type === "image" && !node.overlay) {
                                                node.overlay = existingUser.profilePicPublicId.replace(/\//g, ":");
                                            }
                                            return [4 /*yield*/, formatNode_1.formatNode.format_node(node, {
                                                    programId: program.id,
                                                    userId: existingUser.id,
                                                })];
                                        case 1:
                                            formattedNode = _a.sent();
                                            refactoredNodes_1.push(formattedNode);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        _c.sent();
                        console.log({ refactoredNodes: refactoredNodes_1 });
                        profile_url = (0, core_1.generateCloudinaryTransformationImage)({
                            framePublicId: program.profileFramePublicId,
                            height: program.profileFrameHeight,
                            nodes: refactoredNodes_1,
                            width: program.profileFrameWidth,
                        });
                        userProgram.profileImageUrl = profile_url;
                        userProgram.profileGenerationDate = new Date();
                        return [4 /*yield*/, userProgram.save()];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        if (!profile_url)
                            throw new core_1.BadRequestError("Could not Generate Profile, Please try again");
                        core_1.logger.info("Profile for User ".concat(existingUser.id, " Generated successfully"));
                        return [2 /*return*/, {
                                code: core_1.HttpStatus.OK,
                                message: "Profile for User Generated successfully",
                                data: profile_url,
                            }];
                }
            });
        }); };
    }
    return GenerateProfile;
}());
exports.generateProfile = new GenerateProfile(models_1.Program, models_1.UserPrograms, models_1.ProgramNodes, model_1.Users);
