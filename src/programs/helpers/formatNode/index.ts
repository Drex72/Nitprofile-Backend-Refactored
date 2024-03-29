import { ProgramNodes } from "@/programs/models"
import { placeHolderTextConverter } from "../placeholderText"

interface IOptions {
    programId: string
    userId: string
}

class FormatNode {
    constructor() {}

    format_node = async (node: ProgramNodes, options: IOptions) => {
        if (node.type === "image") return this._format_image_node(node)

        if (node.type === "text" && node.placeholder) return this._format_placeholder_node(node, options)

        if (node.type === "text") return this._format_text_node(node)
    }

    private _format_image_node = (node: ProgramNodes) => {
        const refactoredNode = {
            overlay: node.overlay ?? undefined,
            width: node.width ?? undefined,
            height: node.height ?? undefined,
            gravity: node.gravity ?? undefined,
            radius: node.radius ?? undefined,
            crop: node.crop ?? undefined,
            x: node.x ?? undefined,
            y: node.y ?? undefined,
        }

        return refactoredNode
    }

    private _format_text_node = (node: ProgramNodes) => {
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

    private _format_placeholder_node = async (node: ProgramNodes, options: IOptions) => {
        const { programId, userId } = options

        const refactoredNode = await placeHolderTextConverter.convert_entity_placeholder(node, { programId, userId })

        return refactoredNode
    }
}

export const formatNode = new FormatNode()
