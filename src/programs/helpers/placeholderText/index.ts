import { Users } from "@/auth/model"
import { BadRequestError } from "@/core"
import { AppMessages } from "@/core/common"
import { Program } from "@/programs/models"
import type { IPlaceholderTextNode } from "@/programs/types"

interface IOptions {
    programId: string
    userId: string
}

class PlaceholderText {
    constructor(private readonly dbPrograms: typeof Program, private readonly dbUser: typeof Users) {}

    convert_entity_placeholder = async (node: IPlaceholderTextNode, options: IOptions) => {
        const refactoredNode = node

        if (node.entity === "program") {
            return this._convert_program_entity_placeholder(refactoredNode, options.programId)
        }

        if (node.entity === "user") {
            return this._convert_user_entity_placeholder(refactoredNode, options.userId)
        }

        if (node.entity === "date") {
            return this._convert_date_entity_placeholder(refactoredNode)
        }
    }

    private _convert_date_entity_placeholder = async (node: IPlaceholderTextNode) => {
        node.text = new Date().toLocaleDateString()

        return this._format_node(node)
    }

    private _convert_user_entity_placeholder = async (node: IPlaceholderTextNode, userId: string) => {
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

    private _convert_program_entity_placeholder = async (node: IPlaceholderTextNode, programId: string) => {
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

    private _format_node = (node: IPlaceholderTextNode) => {
        delete node.entity

        delete node.entity_key

        delete node.placeholder

        return node
    }
}

const placeHolderText = new PlaceholderText(Program, Users)
