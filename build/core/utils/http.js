"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = exports.HttpHelper = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("../errors");
const logging_1 = require("../logging");
const statusCodes_1 = __importDefault(require("./statusCodes"));
class HttpHelper {
    constructor() {
        this.headers = {};
        this.get = async (url) => {
            return this.makeRequest(url, "GET");
        };
        this.post = async (url, data) => {
            return this.makeRequest(url, "POST", data);
        };
        this.appendHeader = (key, value) => {
            this.headers[key] = value;
            return this;
        };
        this.makeRequest = async (url, method, data) => {
            try {
                const response = await (0, axios_1.default)(url, {
                    method,
                    data,
                    headers: {
                        ...this.headers,
                    },
                });
                if (response.status === statusCodes_1.default.OK)
                    return response.data;
            }
            catch (err) {
                logging_1.logger.error(err);
                throw new errors_1.UnProcessableError("Error performing request");
            }
        };
    }
}
exports.HttpHelper = HttpHelper;
exports.HttpClient = new HttpHelper();
