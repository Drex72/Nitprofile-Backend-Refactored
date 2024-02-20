import type { Program } from "@/programs/models/program.model"

export const isProgramProfileValid = (program: Program): boolean => {
    return !program.profileFramePublicId || !program.profileFrameHeight || !program.profileFrameWidth
}
