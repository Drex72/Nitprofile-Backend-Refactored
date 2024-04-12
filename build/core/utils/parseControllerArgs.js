"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseContextArgs {
    constructor() {
        this.parse = (req) => {
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
}
ParseContextArgs.parseFileContents = (files) => {
    if (!files)
        return null;
    const fileObjects = {};
    for (let key in files) {
        const file = files[key];
        fileObjects[key] = file;
    }
    return fileObjects;
};
exports.default = new ParseContextArgs();
