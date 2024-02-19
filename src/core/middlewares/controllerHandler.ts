import { HttpStatus, joiValidate, parseControllerArgs, ForbiddenError, UnAuthorizedError, UnProcessableError, logger } from "@/core"
import type { Response, Request, NextFunction } from "express"
import type { AnyFunction, ControllerHandlerOptions, ExpressCallbackFunction, IAuthRoles, ValidationSchema } from "@/core"
import { authGuard } from "@/auth/helpers/authGuard"

export class ControllerHandler {
    handle = (controllerFn: AnyFunction, schema: ValidationSchema | undefined = {}, options?: ControllerHandlerOptions): ExpressCallbackFunction => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (options?.isPrivate) {
                    await this.validateRequest(req, options)
                }

                const controllerArgs = parseControllerArgs.parse(req)
                const { input, params, query } = controllerArgs

                if (schema) {
                    const { querySchema, paramsSchema, inputSchema } = schema

                    try {
                        if (inputSchema) joiValidate(inputSchema, input)
                        if (querySchema) joiValidate(querySchema, query)
                        if (paramsSchema) joiValidate(paramsSchema, params)
                    } catch (error: any) {
                        throw new UnProcessableError(error.message.replaceAll('"', ""))
                    }
                }

                const controllerResult = await controllerFn(controllerArgs)

                if (!controllerResult) {
                    res.status(HttpStatus.OK).send({ status: true })

                    return
                }

                const { code, headers, ...data } = controllerResult

                res.set({ ...headers })
                    .status(code ?? HttpStatus.OK)
                    .send(data)
            } catch (error) {
                logger.error(error)

                next(error)
            }
        }
    }

    private async validateRequest(req: Request, options: ControllerHandlerOptions) {
        if (!req.user || !req?.user?.id || !req?.user?.role ) {
            const isRequestAllowed = await authGuard.guard(req.cookies)

            if (!isRequestAllowed) throw new UnAuthorizedError("Unauthorized")

            if (options.allowedRoles && options.allowedRoles.length > 0) {
                const isRequestAuthorized = options.allowedRoles?.includes(isRequestAllowed.role.toLocaleUpperCase() as IAuthRoles)

                if (!isRequestAuthorized) throw new ForbiddenError("You do not have access to the requested resource")
            }

            req.user = isRequestAllowed
        }
    }
}
