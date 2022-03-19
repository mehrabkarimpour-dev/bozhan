import ResponseAbstract from "../responseAbstract";
import {Request, Response} from "express";

export default class Json extends ResponseAbstract {

    readonly type: string = 'application/json';

    public converter(req: Request, res: Response, ...data: any): any {
        res.json(data)
    }

}
