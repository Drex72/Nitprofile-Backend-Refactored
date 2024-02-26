import type { ContextTypes, RequestFileContents } from "@/core"

export interface UpdateProfilePicturePayload extends ContextTypes {
    files: {
        pfp: RequestFileContents
    }
}
