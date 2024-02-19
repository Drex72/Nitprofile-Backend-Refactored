import type { ContextTypes } from "@/core"
import type { Node } from "../types"

interface IBaseProgram {
    name: string
    startDate: Date
    endDate: Date
}

export interface IProgramUser {
    email: string
    firstName: string
    lastName: string
}

export interface CreateProgramPayload extends ContextTypes {
    input: IBaseProgram
}

export interface UpdateProgramPayload extends ContextTypes {
    input: Partial<IBaseProgram>

    query: {
        id: string
    }
}

export interface FindSingleProgram extends ContextTypes {
    query: {
        id: string
    }
}

export interface AddProgramProfileFramePayload extends ContextTypes {
    input: {
        profileFrameHeight: number
        profileFrameWidth: number
    }
    query: {
        id: string
    }
}

export interface CreateProgramNodesPayload extends ContextTypes {
    input: {
        nodes: Node[]
    }
    query: {
        id: string
    }
}

export interface UpdateProgramNodePayload extends ContextTypes {
    input: {
        node: Partial<Node>
    }
    query: {
        id: string
    }
}

export interface GenerateProgramProfilePayload extends ContextTypes {
    params: {
        program_id: string
    }
}
