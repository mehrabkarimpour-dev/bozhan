import {RequestsForm} from "./Requests";
import {check, validationResult} from 'express-validator'
import {NextFunction, Request, Response} from "express";
import path from "path";

class LoginRequest extends RequestsForm {

    public validate() {

        return [
            check('file')
                .custom(async value => {

                    if (!value) throw new Error('لطفا ورودی فایل را وارد کنید')
                    let fileExt = ['.png', '.gif', '.jpg', '.jpeg', '.svg']

                    if (!fileExt.includes(path.extname(value))) throw new Error('لطفا فقط تصویر وارد کنید')

                })
                .withMessage('لطفا ورودی نام را وارد کنید')
                .isLength({min: 255})
                .withMessage('حداکثر طول نام ۲۵۵ کاراکتر میباشد'),
        ]
    }

    handle(req: Request, res: Response, next: NextFunction) {
        const validationErrors = validationResult(req)
        if (validationErrors && validationErrors['errors'].length > 0) {
            res.status(401).json(validationErrors)
        } else {
            next()
        }

    }

}

export default new LoginRequest();