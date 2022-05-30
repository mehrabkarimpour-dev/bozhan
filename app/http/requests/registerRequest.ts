import {RequestsForm} from "./Requests";
import {body, validationResult} from 'express-validator'
import {required, max, integer, min, alreadyExists} from "../../../resources/lang/fa/validation";
import db from "../../models/sequelize";
import {Model} from "sequelize";
import {NextFunction, Request, Response} from "express";


class RegisterRequest extends RequestsForm {

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
    public static _name: string = 'register'

    private checkMobileUnique(value: string) {
        return db.User.findOne({
            where: {
                mobile: value
            }
        }).then((user: Model) => {
            if (user === null)
                return Promise.reject('Name already taken')
        })
    }

    public validate() {
        return [

            body('mobile').not().isEmpty().withMessage(required(' شماره موبایل '))
                .isLength({min: 11}).withMessage(min('  شماره موبایل ', ' 11 '))
                .isLength({max: 11}).withMessage(max('  شماره موبایل ', ' 11 '))
                .not().custom(this.checkMobileUnique).withMessage(alreadyExists(' شماره موبایل')),

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
        req.body = RequestsForm.filterParamValid(req.body, RegisterRequest.validParams)
        const validationErrors = validationResult(req)
        if (validationErrors && validationErrors['errors'].length > 0)
            return res.status(401).json({
                status: false,
                message: '',
                data: validationErrors
            })
        return next()
    }
}

export default RegisterRequest;