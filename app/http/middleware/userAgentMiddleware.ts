import {NextFunction, Request, Response} from 'express'


export class userAgentMiddleware {


    public static _name: string = 'view'
    public static hasParams: boolean = true
    public static parameters: any = null



    /**
     * @param parameters
     * @author mehrab karimpour
     */
    constructor(parameters: object | string | null = null) {
        userAgentMiddleware.parameters = parameters
    }
    /**
     * @param req
     * @param res
     * @param next
     * @author mehrab karimpour
     */
    public async run(req: Request, res: Response, next: NextFunction) {
        req.contentType = req.headers['content-type'] ?? null
        req.agentView = userAgentMiddleware.parameters ?? 'home'
        return next()
    }

}