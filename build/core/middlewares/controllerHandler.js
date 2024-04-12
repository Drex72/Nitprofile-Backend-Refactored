"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerHandler = void 0;
const core_1 = require("@/core");
const authGuard_1 = require("@/auth/helpers/authGuard");
const common_1 = require("../common");
class ControllerHandler {
    constructor() {
        this.handle = (controllerFn, schema = {}, options) => {
            return async (req, res, next) => {
                try {
                    if (options?.isPrivate) {
                        await this.validateRequest({
                            options,
                            user: req.user,
                            cookies: req.cookies,
                            callbackFn: (user) => {
                                req.user = user;
                            },
                        });
                    }
                    const controllerArgs = core_1.parseControllerArgs.parse(req);
                    const { input, params, query } = controllerArgs;
                    if (schema) {
                        const { querySchema, paramsSchema, inputSchema } = schema;
                        try {
                            if (inputSchema)
                                (0, core_1.joiValidate)(inputSchema, input);
                            if (querySchema)
                                (0, core_1.joiValidate)(querySchema, query);
                            if (paramsSchema)
                                (0, core_1.joiValidate)(paramsSchema, params);
                        }
                        catch (error) {
                            throw new core_1.UnProcessableError(error.message.replaceAll('"', ""));
                        }
                    }
                    const controllerResult = await controllerFn(controllerArgs);
                    if (!controllerResult) {
                        res.status(core_1.HttpStatus.OK).send({ status: true });
                        return;
                    }
                    const { code, headers, ...data } = controllerResult;
                    res.set({ ...headers })
                        .status(code ?? core_1.HttpStatus.OK)
                        .send(data);
                }
                catch (error) {
                    core_1.logger.error(`error ${error}`);
                    next(error);
                }
            };
        };
    }
    async validateRequest(data) {
        const { callbackFn, cookies, options, user } = data;
        if (user && user.id && user?.role)
            return;
        const isRequestAllowed = await authGuard_1.authGuard.guard(cookies);
        if (!isRequestAllowed)
            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
        if (options.allowedRoles && options.allowedRoles.length > 0) {
            const isRequestAuthorized = options.allowedRoles?.includes(isRequestAllowed.role.toLocaleUpperCase());
            if (!isRequestAuthorized)
                throw new core_1.ForbiddenError("You do not have access to the requested resource");
        }
        callbackFn(isRequestAllowed);
    }
}
exports.ControllerHandler = ControllerHandler;
