"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.generateCloudinaryTransformationImage = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
exports.cloudinary = cloudinary;
const config_1 = require("./config");
cloudinary.config({
    cloud_name: config_1.config.cloudinary.cloudName,
    api_key: config_1.config.cloudinary.apiKey,
    api_secret: config_1.config.cloudinary.apiSecret,
});
const generateCloudinaryTransformationImage = (props) => {
    const { framePublicId, height, nodes, width } = props;
    return cloudinary.url(framePublicId, {
        transformation: [
            {
                width,
                height,
                crop: "fill",
                gravity: "center",
            },
            ...nodes,
        ],
    });
};
exports.generateCloudinaryTransformationImage = generateCloudinaryTransformationImage;
