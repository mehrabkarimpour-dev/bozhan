import {Request, Response} from "express"
import convert from 'xml-js'
const autoBind = require('auto-bind')

export class Controller {

    public recaptcha: any = {};

    constructor() {
        autoBind(this)
    }

    public render = async (req: Request, res: Response, data: any) => {
        switch (req.contentType) {
            case 'application/json':
                return res.json(data)
            case 'application/xml':
                let xmlResponse = convert.json2xml(data, {compact: true, ignoreComment: true, spaces: 4})
                res.set('Content-Type', 'text/xml')
                return res.send(xmlResponse)
            default:
                return res.render(req.agentView)
        }
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