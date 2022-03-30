import {Request, Response} from "express"
import AppResponse from "../../services/response/response";
import {injectableServiceProvider} from "../../providers/injectableServiceProvider";

const autoBind = require('auto-bind')

export class Controller {

    public recaptcha: any = {};

    constructor() {
        autoBind(this)
    }

    public render = async (req: Request, res: Response, data: any = null) => {
        let appResponse = injectableServiceProvider.bind(AppResponse)
        return appResponse.response(req, res, data)
    }

    public addItemToArray(arr: any, key: string, value: any) {
        arr.map((item: any, index: number) => {
            arr[index][key] = value
        })
        return arr
    }

    public parent = () => {
        return 'controller'
    }

}