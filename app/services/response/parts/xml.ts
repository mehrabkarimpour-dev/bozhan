import ResponseAbstract from "../responseAbstract";
import {Request, Response} from "express";
import convert from 'xml-js'


export default class Xml extends ResponseAbstract {

    readonly type: string = 'application/xml';

    /**
     * @param req
     * @param res
     * @param data
     */
    public converter(req: Request, res: Response, data: any): any {
        let xmlResponse = convert.json2xml(data, {compact: true, ignoreComment: true, spaces: 4})
        res.set('Content-Type', 'text/xml')
        return res.send(xmlResponse)
    }

}

