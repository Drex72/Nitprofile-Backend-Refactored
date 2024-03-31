"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentOrigin = void 0;
var __1 = require("..");
var getCurrentOrigin = function () {
    switch (__1.config.appEnvironment) {
        case "development":
            return __1.config.urls.devOrigin;
        case "staging":
            return __1.config.urls.stagingOrigin;
        case "production":
            return __1.config.urls.liveOrigin;
    }
};
exports.currentOrigin = getCurrentOrigin();
