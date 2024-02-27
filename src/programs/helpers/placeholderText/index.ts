import { Users } from "@/auth/model"
import { BadRequestError } from "@/core"
import { AppMessages } from "@/core/common"
import { Program, ProgramNodes } from "@/programs/models"

interface IOptions {
    programId: string
    userId: string
}

class PlaceholderText {
    constructor(private readonly dbPrograms: typeof Program, private readonly dbUser: typeof Users) {}

    convert_entity_placeholder = async (node: ProgramNodes, options: IOptions) => {
        if (node.entity === "program") {
            return this._convert_program_entity_placeholder(node, options.programId)
        }

        if (node.entity === "user") {
            return this._convert_user_entity_placeholder(node, options.userId)
        }

        if (node.entity === "date") {
            return this._convert_date_entity_placeholder(node)
        }
    }

    private _convert_date_entity_placeholder = (node: ProgramNodes) => {
        node.text = new Date().toLocaleDateString()

        return this._format_node(node)
    }

    private _convert_user_entity_placeholder = async (node: ProgramNodes, userId: string) => {
        const selectedUser = await this.dbUser.findOne({
            where: {
                id: userId,
            },
        })

        if (!selectedUser) throw new BadRequestError("Invalid User")

        const key = (node.entity_key as keyof Users) ?? "name"

        const value = selectedUser[key] ?? "Invalid Property"

        node.text = value.toString()

        return this._format_node(node)
    }

    private _convert_program_entity_placeholder = async (node: ProgramNodes, programId: string) => {
        const selectedProgram = await this.dbPrograms.findOne({
            where: {
                id: programId,
            },
        })

        if (!selectedProgram) throw new BadRequestError(AppMessages.FAILURE.INVALID_PROGRAM)

        const key = (node.entity_key as keyof Program) ?? "name"

        const value = selectedProgram[key] ?? "Invalid Property"

        node.text = value.toString()

        return this._format_node(node)
    }

    private _format_node = (node: ProgramNodes) => {
        const refactoredNode = {
            overlay: {
                text: node.text ?? undefined,
                font_family: node.font_family ?? undefined,
                font_size: node.font_size ?? undefined,
                font_weight: node.font_weight ?? undefined,
            },
            x: node.x,
            y: node.y,
            color: node.color ?? undefined,

        }

        return refactoredNode
    }
}

export const placeHolderTextConverter = new PlaceholderText(Program, Users)
