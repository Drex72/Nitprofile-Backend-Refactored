export type INodeType = "image" | "text"

export const placeholderTextNodeEntity = ["program", "date", "user"] as const

export type IPlaceholderTextNodeEntity = (typeof placeholderTextNodeEntity)[number]

interface INode {
    x: number
    y: number
}

export interface IImageNode extends INode {
    type: "image"
    width: number
    height: number
    gravity: number
    radius: number
    crop: number
}

export interface ITextNode extends INode {
    type: "text"
    text: string
    gravity?: number
    font_family: string
    font_size?: number
    font_weight?: string
    color?: string
    placeholder?: boolean
}

export interface IPlaceholderTextNode extends ITextNode {
    entity?: IPlaceholderTextNodeEntity
    entity_key?: string
}

export type Node = IImageNode | ITextNode | IPlaceholderTextNode
