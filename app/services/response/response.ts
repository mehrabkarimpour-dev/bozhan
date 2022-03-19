import {Request, Response} from "express";
import Html from "./parts/html";
import Json from "./parts/json";
import Xml from "./parts/xml";

export default class AppResponse {

    public responses: Array<object> | undefined = [
        Html,
        Json,
        Xml
    ]

    public response(req: Request, res: Response, ...data: any) {
        this.responses?.map((_response: any) => {
            let _objResponse = new _response()
            if (_objResponse.type === req.contentType) {
                return _objResponse.converter(req, res, ...data)
            }
        })
    }
}