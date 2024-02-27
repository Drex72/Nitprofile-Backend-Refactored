import type { Sharp } from "sharp"
import sharp from "sharp"

interface IResizeImage {
    imageBuffer: Buffer
    width: number
    height: number
}

class ImageManipulator {
    constructor(private readonly transformer: typeof sharp) {}

    public resizeImage = async (data: IResizeImage): Promise<Buffer> => {
        const { height, imageBuffer, width } = data

        const imageToResize = this.transformer(imageBuffer)

        const resizedBuffer = await imageToResize
            .resize(width, height, {
                fit: sharp.fit.outside,
            })
            .toBuffer()

        return resizedBuffer
    }
}

export const imageManipulator = new ImageManipulator(sharp)
