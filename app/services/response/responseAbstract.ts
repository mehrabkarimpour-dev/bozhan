import {Request, Response} from "express";

export default abstract class ResponseAbstract {

    readonly abstract type: string

    public abstract converter(req: Request, res: Response, ...data: any): any;


}