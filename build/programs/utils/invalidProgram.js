"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProgramProfileValid = void 0;
var isProgramProfileValid = function (program) {
    var profileFramePublicId = program.profileFramePublicId, certificateFramePublicId = program.certificateFramePublicId;
    return profileFramePublicId || certificateFramePublicId ? true : false;
};
exports.isProgramProfileValid = isProgramProfileValid;
