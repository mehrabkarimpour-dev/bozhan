import {NextFunction, Request, Response} from "express"
import {setAuth} from "vendor/core/autoload/auth"
import jwt from "jsonwebtoken"
import appConfig from "config/app"


export class AuthMiddleware {


    public static _name: string = 'auth'
    public static hasParams: boolean = false
    public static parameters: any = null

    /**
     *   ! information
     *  if params be equal to true for getting params you need
     *  in route passing all parameters to middleware in second param...
     */

    constructor(parameters: object | string | null = null) {
        AuthMiddleware.parameters = parameters
    }

    public async run(req: Request, res: Response, next: NextFunction) {

        if (req.headers.authorization && req.headers?.authorization?.split('Bearer')[1]) {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const auth: any = jwt.verify(token, appConfig.secretKey);

                if (auth && auth.dataValues) {
                    setAuth(auth.dataValues)
                    req.auth = auth.dataValues
                    return next()
                } else {
                    return res.status(403).json({
                        status: false,
                        message: 'لطفا ابتدا وارد شوید',
                        data: null
                    })
                }
            } catch (e) {
                return res.status(403).json({
                    status: false,
                    message: 'لطفا ابتدا وارد شوید',
                    data: null
                })
            }
        } else {
            return res.status(403).send({
                status: false,
                message: 'لطفا ابتدا وارد شوید',
                data: null
            })
        }
    }

}