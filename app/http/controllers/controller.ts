import UserRepositoryInterface from "../../repositories/UserRepositoryInterface";

const autoBind = require('auto-bind')
const {validationResult} = require("express-validator")
var Recaptcha = require('express-recaptcha').RecaptchaV2

export class Controller {

    public recaptcha: any = {};

    //public repository;

    constructor(modules: any) {
        //autoBind(this)
        this.recaptchaConfig()
    }

    public addItemToArray(arr: any, key: string, value: any) {
        arr.map((item: any, index: number) => {
            arr[index][key] = value
        })
        return arr
    }

    recaptchaConfig = () => {

        this.recaptcha = new Recaptcha(
            '6Lf5VlYcAAAAAOvXuZc2UE79X9_UIzLhzRQm6aOs',
            '6Lf5VlYcAAAAAD_gSIHIYVVYu_394ihH78mu1NcJ',
            {'hl': 'fa'}
        )
    }

    recaptchaValidation = async (req: any, res: any, callbackUrl = '/auth/register') => {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (error: any, data: any) => {
                if (error) {
                    req.flash('errors', ['لطفا تایید کنید که ربات نیستید'])
                    res.redirect(callbackUrl)
                }
                if (data) {
                    resolve(true)
                }
            })
        })
    }

    public parent = () => {
        return 'controller'
    }

    /*validationData = async (req: any) => {
        const result = await validationResult(req)
        const errors = result.array()
        let messages: any = []
        errors.forEach((error: any) => messages.push(error.msg))

        if (messages.length > 0)
            req.flash('errors', messages)

        return messages.length === 0
    }*/


}