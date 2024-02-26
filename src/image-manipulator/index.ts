import { type UploadedFile } from "express-fileupload"
import sharp, { type FormatEnum } from "sharp"

const INPUT_DIRECTORY = __dirname + "/assets/input"

const TMP_DIRECTORY = __dirname + "/assets/tmp"

const OUTPUT_DIRECTORY = __dirname + "/assets/output"

interface IFormatImage {
    extension: keyof FormatEnum
    fileName: string
    width?: number
    height: number
}

const formatImage = async (data: IFormatImage) => {
    const { extension, fileName, height, width } = data

    const input_file = `${INPUT_DIRECTORY}/${fileName}`
    const output_file = `${OUTPUT_DIRECTORY}/${fileName}`

    await sharp(input_file).toFormat(extension, { palette: true }).resize({ fit: "cover" }, height).sharpen(13).toFile(output_file)

    return output_file
}

const uploadFileToDirectory = (targetFile: UploadedFile) => {
    const fileName = targetFile.name
    const uploadPath = `${INPUT_DIRECTORY}/`
    const filePathName = uploadPath + fileName

    targetFile.mv(filePathName, (err) => {
        // If there is an error
        if (err) {
            throw new Error("Error uploading File")
        }
    })
}

interface IResizeImage {
    imageBuffer: Buffer
    width: number
    height: number
}
export const resizeImage = async (data: IResizeImage) => {
    const { height, imageBuffer, width } = data

    const imageToResize = sharp(imageBuffer)

    const resizedBuffer = await imageToResize
        .resize(width, height, {
            fit: sharp.fit.outside,
        })
        .toBuffer()

    return resizedBuffer
}
