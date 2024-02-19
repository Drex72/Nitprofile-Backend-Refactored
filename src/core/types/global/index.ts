import type { ITokenSignedPayload } from "../common"

declare global {
    namespace Express {
        export interface Request {
            user: ITokenSignedPayload | null | undefined
            file: any
        }
    }
}
