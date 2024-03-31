"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParseContextArgs = /** @class */ (function () {
    function ParseContextArgs() {
        this.parse = function (req) {
            return {
                input: req.body,
                params: req.params,
                query: req.query,
                headers: req.headers,
                user: req.user,
                files: ParseContextArgs.parseFileContents(req.files),
            };
        };
    }
    ParseContextArgs.parseFileContents = function (files) {
        if (!files)
            return null;
        var fileObjects = {};
        for (var key in files) {
            var file = files[key];
            fileObjects[key] = file;
        }
        return fileObjects;
    };
    return ParseContextArgs;
}());
exports.default = new ParseContextArgs();
