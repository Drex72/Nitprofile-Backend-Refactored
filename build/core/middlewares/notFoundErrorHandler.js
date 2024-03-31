"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorHandler = void 0;
var errors_1 = require("../errors");
var NotFoundErrorHandler = /** @class */ (function () {
    function NotFoundErrorHandler() {
        this.handle = function (req, _, next) {
            next(new errors_1.RouteNotFoundError("request path \"".concat(req.path, "\" not found for ").concat(req.method, " method.")));
        };
    }
    return NotFoundErrorHandler;
}());
exports.NotFoundErrorHandler = NotFoundErrorHandler;
