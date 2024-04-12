"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentOrigin = void 0;
const __1 = require("..");
const getCurrentOrigin = () => {
    switch (__1.config?.appEnvironment) {
        case "development":
            return __1.config.urls.devOrigin;
        case "staging":
            return __1.config.urls.stagingOrigin;
        case "production":
            return __1.config.urls.liveOrigin;
    }
};
exports.currentOrigin = getCurrentOrigin();
