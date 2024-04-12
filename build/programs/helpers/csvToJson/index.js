"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customCsvToJsonConverter = void 0;
const csvtojson_1 = __importDefault(require("csvtojson"));
class CSVTOJSON {
    constructor(converter = (0, csvtojson_1.default)()) {
        this.converter = converter;
        this.stream = (readableStream, onData) => {
            const stream = this.converter.fromStream(readableStream);
            stream.subscribe(onData);
        };
    }
    async convert(csvFilePath) {
        return await this.converter.fromFile(csvFilePath);
    }
}
exports.customCsvToJsonConverter = new CSVTOJSON();
