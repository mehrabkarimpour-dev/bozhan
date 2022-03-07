import {NextFunction, Request, Response} from "express";
import AuthCache from "vendor/core/cache/authCache";
import db from "app/models/sequelize";
import Middleware from "./Middleware";
import {Auth} from "vendor/core/autoload/auth";


export class RoleMiddleware {


    public static _name: string = 'role'
    public static hasParams: boolean = true
    public static parameters: any = null

    /**
     * if params be equal to true for getting params you need public params() method...
     *    public params(param : string) {
     *
     *    }
     */

    constructor(parameters: object | string | null = null) {
        RoleMiddleware.parameters = parameters
    }


    public static async hasRole(req: Request) {
        let role = await db.User.findOne({
            include: {
                association: 'roles',
                where: {
                    key: RoleMiddleware.parameters
                }
            },
            where: {
                // @ts-ignore
                id: Auth().id
            },
            attributes: ['id'],
        })
        // @ts-ignore
        return req.auth.roles = role?.dataValues?.roles ?? null
    }

    public async run(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        if (!req.auth) return Middleware.needAuth(req, res)

        await RoleMiddleware.hasRole(req)
        // @ts-ignore
        if (req.auth.roles)
            return next()
        else return res.status(403).send({
            status: false,
            message: 'دسترسی غیر مجاز',
            data: null
        })
    }

}