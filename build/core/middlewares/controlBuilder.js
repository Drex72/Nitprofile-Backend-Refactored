"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlBuilder = void 0;
const controllerHandler_1 = require("./controllerHandler");
class ControlBuilder {
    constructor() {
        this.availableOptions = {
            isPrivate: false,
            isPrivateAndPublic: false,
        };
        this.options = this.availableOptions;
    }
    static builder() {
        return new ControlBuilder();
    }
    setHandler(func) {
        this.handler = func;
        return this;
    }
    setValidator(schema) {
        this.schema = schema;
        return this;
    }
    isPrivate() {
        this.options = { ...this.options, isPrivate: true };
        return this;
    }
    only(...allowed) {
        this.options = { isPrivate: true, allowedRoles: allowed };
        return this;
    }
    handle() {
        return new controllerHandler_1.ControllerHandler().handle(this.handler, this.schema, this.options);
    }
}
exports.ControlBuilder = ControlBuilder;
