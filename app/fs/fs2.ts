import multer from "multer";
import {Request} from "express";
import UploadImage from "./published/uploadImage";
import UploadImage2 from "./published/uploadImage2";

const filesUpload = [
    UploadImage,
    UploadImage2
]

let storages: any = {}

filesUpload.map((fileUpload: any) => {
    let _fileUploadObj = new fileUpload()
    let newMulter = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'storage/' + _fileUploadObj.path)
        },
        filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
            callback(null, file.originalname)
        }
    })
    console.log(_fileUploadObj.name)
    //storages[_fileUploadObj.name] = _fileUploadObj.name
    storages[_fileUploadObj.name] = multer({
        storage: newMulter
    })

})


export default storages;