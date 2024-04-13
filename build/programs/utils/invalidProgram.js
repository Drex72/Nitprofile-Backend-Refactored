"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProgramProfileValid = void 0;
const isProgramProfileValid = (program) => {
    const { profileFramePublicId, certificateFramePublicId } = program;
    return profileFramePublicId || certificateFramePublicId ? true : false;
};
exports.isProgramProfileValid = isProgramProfileValid;
