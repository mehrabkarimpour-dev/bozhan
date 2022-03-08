import multer from "multer";
import {Request} from "express";
import UploadImage from "./published/uploadImage";

const filesUpload = [
    UploadImage
]



const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/app')
    },
    filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, file.originalname)
    }
})


const uploadImage = multer({
    storage: ImageStorage
})

export default uploadImage;