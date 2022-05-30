import {NextFunction, Request, Response} from 'express'


export class agentMiddleware {


    public static _name: string = 'agent'
    public static hasParams: boolean = true
    public static parameters: any = null



    /**
     * @param parameters
     * @author mehrab karimpour
     */
    constructor(parameters: object | string | null = null) {
        agentMiddleware.parameters = parameters
    }
    /**
     * @param req
     * @param res
     * @param next
     */
    public async run(req: Request, res: Response, next: NextFunction) {
        req.contentType = req.headers['content-type'] ?? 'html'
        return next()
    }

}