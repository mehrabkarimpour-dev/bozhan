import {RequestsForm} from "./Requests";
import {body, validationResult} from 'express-validator'
import {required, max} from "../../../resources/lang/fa/validation";
import {NextFunction, Request, Response} from "express";


class LoginRequest extends RequestsForm {

    public static params: any = null

    constructor() {
        super();
    }

    public static validParams: object = [
        'mobile',
        'password'
    ]

    public static  _name: string = 'loginValidation'

    public validate() {
        return [
            body('mobile').not().isEmpty().withMessage(required('شماره موبایل')),
            body('password').not().isEmpty().withMessage(required('رمز عبور')),
            body('password').isLength({max: 12}).withMessage(max('رمز عبور', '12')),
            body('password').isLength({min: 4}).withMessage(max('رمز عبور', '4'))
        ]
    }

    public handle(req: Request, res: Response, next: NextFunction) {
        req.body = RequestsForm.filterParamValid(req.body, LoginRequest.validParams)
        const validationErrors = validationResult(req)
        if (validationErrors && validationErrors['errors'].length > 0)
            return res.status(401).json(validationErrors)
        return next()
    }
}

export default LoginRequest;