import multer from "multer";
import {Request} from "express";
import {Container} from "../../../app/providers/AppContainer";
import fs from "fs";


let storages: any = {}

function setPath(path: string) {
    let pathArray = path.split('/')
    delete  pathArray[0]
    let pathForCreate = 'storage'
    if (pathArray.length > 1) {
        for (let i = 0; i < pathArray.length; i++) {
            if (pathArray[i]) {
                pathForCreate += '/' + pathArray[i]
                if (!fs.existsSync(pathForCreate)) {
                    fs.mkdirSync(pathForCreate)
                }
            }
        }
    }
}

Container._uploads.map((fileUpload: any) => {
    let _fileUploadObj = new fileUpload()
    let newMulter = multer.diskStorage({
        destination: (req, file, cb) => {
            setPath(_fileUploadObj.path)
            cb(null, 'storage/' + _fileUploadObj.path)
        },
        filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
            callback(null, file.originalname)
        }
    })
    storages[fileUpload._name] = multer({
        storage: newMulter
    })
})


export default storages;