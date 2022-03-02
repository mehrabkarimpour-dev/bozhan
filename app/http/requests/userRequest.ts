import {RequestsForm} from "./Requests";
import {body, validationResult} from 'express-validator'
import {required, max, min} from "../../../resources/lang/fa/validation";
import {NextFunction, Request, Response} from "express";


class UserRequest extends RequestsForm {

    public static params: any = null

    constructor() {
        super();
    }

    public static validParams: object = [
        'mobile',
        'password',
        'firstName',
        'lastName',
        'email'
    ]


    public static _name: string = 'loginValidation'

    public validate() {
        return [
            body('mobile').not().isEmpty().withMessage(required(' شماره موبایل '))
                .isLength({min: 11}).withMessage(min('  شماره موبایل ', ' 11 '))
                .isLength({max: 11}).withMessage(max('  شماره موبایل ', ' 11 ')),

            body('password').not().isEmpty().withMessage(required(' رمز عبور '))
                .isLength({min: 6}).withMessage(min('  رمز عبور ', ' 6 '))
                .isLength({max: 12}).withMessage(max('  رمز عبور ', ' 12 ')),

            body('firstName').not().isEmpty().withMessage(required(' نام  '))
                .isLength({max: 255}).withMessage(max(' نام ', ' 12 ')),

            body('lastName').not().isEmpty().withMessage(required(' نام خانوادگی ')),

            body('email').isEmpty().withMessage(required(' ایمیل '))
                .not().isEmail().withMessage(required(' ایمیل '))
        ]
    }

    public handle(req: Request, res: Response, next: NextFunction) {
        const validationErrors = validationResult(req)
        if (validationErrors && validationErrors['errors'].length > 0)
            return res.status(401).json(validationErrors)
        req.body = RequestsForm.filterParamValid(req.body, UserRequest.validParams)
        return next()
    }
}

export default UserRequest;