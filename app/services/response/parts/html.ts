import ResponseAbstract from "../responseAbstract";
import {Request, Response} from "express";

export default class Html extends ResponseAbstract {

    readonly type: string = 'html';

    public converter(req: Request, res: Response, ...data: any): any {
        return res.render(req.agentView)
    }

}
