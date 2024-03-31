"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.generateCloudinaryTransformationImage = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var cloudinary = cloudinary_1.default.v2;
exports.cloudinary = cloudinary;
var config_1 = require("./config");
cloudinary.config({
    cloud_name: config_1.config.cloudinary.cloudName,
    api_key: config_1.config.cloudinary.apiKey,
    api_secret: config_1.config.cloudinary.apiSecret,
});
var generateCloudinaryTransformationImage = function (props) {
    var framePublicId = props.framePublicId, height = props.height, nodes = props.nodes, width = props.width;
    return cloudinary.url(framePublicId, {
        transformation: __spreadArray([
            {
                width: width,
                height: height,
                crop: "fill",
                gravity: "center",
            }
        ], nodes, true),
    });
};
exports.generateCloudinaryTransformationImage = generateCloudinaryTransformationImage;
