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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePicture = void 0;
var model_1 = require("@/auth/model");
var core_1 = require("@/core");
var common_1 = require("@/core/common");
var fs_1 = __importDefault(require("fs"));
var UpdateProfilePicture = /** @class */ (function () {
    function UpdateProfilePicture(dbUser) {
        var _this = this;
        this.dbUser = dbUser;
        this.handle = function (_a) {
            var files = _a.files, user = _a.user;
            return __awaiter(_this, void 0, void 0, function () {
                var existingUser, imageBuffer, profilePicture, uploadedImage;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!files || !files.pfp || Array.isArray(files.pfp))
                                throw new core_1.ForbiddenError("Profile Image is required");
                            if (!user)
                                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                            return [4 /*yield*/, this.dbUser.findOne({ where: { id: user.id } })];
                        case 1:
                            existingUser = _b.sent();
                            if (!existingUser)
                                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
                            imageBuffer = fs_1.default.readFileSync(files.pfp.tempFilePath);
                            profilePicture = __assign(__assign({}, files.pfp), { data: imageBuffer });
                            return [4 /*yield*/, core_1.imageUploadService.imageUpload(core_1.config.cloudinary.assetsFolder, profilePicture)];
                        case 2:
                            uploadedImage = _b.sent();
                            if (!uploadedImage)
                                throw new core_1.BadRequestError("Error while updating Profile Picture. Please Try again later");
                            existingUser.profilePicPublicId = uploadedImage.public_id;
                            existingUser.profilePicSecureUrl = uploadedImage.secure_url;
                            return [4 /*yield*/, existingUser.save()];
                        case 3:
                            _b.sent();
                            core_1.logger.info("User with ID ".concat(existingUser.id, " updated successfully"));
                            return [2 /*return*/, {
                                    code: core_1.HttpStatus.OK,
                                    message: "Profile Pic Updated Successfully",
                                    data: {
                                        publicId: uploadedImage.public_id,
                                        secureUrl: uploadedImage.secure_url,
                                    },
                                }];
                    }
                });
            });
        };
    }
    return UpdateProfilePicture;
}());
exports.updateProfilePicture = new UpdateProfilePicture(model_1.Users);
