import type { ContextTypes, RequestFileContents } from "@/core"
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

export interface AssignAdminToProgramPayload extends ContextTypes {
    input: {
        programId: string
        adminId: string
    }
}

export interface UpdateProgramPayload extends ContextTypes {
    input: Partial<IBaseProgram>

    query: {
        programId: string
    }
    files: {
        csv: any
    }
}

export interface FindSingleProgram extends ContextTypes {
    query: {
        programId: string
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

export interface RegisterProgramUser extends ContextTypes {
    input: {
        email: string
        firstName: string
        lastName: string
    }

    query: {
        programId: string
    }
    files: {
        csv: RequestFileContents
    }
}
