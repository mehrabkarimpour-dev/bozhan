import Auth from "../../../vendor/core/Auth";

import _ from 'lodash'
import jwt from "jsonwebtoken";
import appConfig from "../../../config/app";
import crypto from "crypto";
import {Request} from "express";
import db from "../../models/sequelize";
import AuthCache from "../../../vendor/core/cache/authCache";


class Jwt implements Auth {

    createToken(user: any): any {
        delete user.token
        delete user.dataValues.token
        delete user._previousDataValues.token
        if (user)
            return jwt.sign(_.omit(user), appConfig.secretKey, {
                expiresIn: 60 * 60 * 24 * 1
            });
        return ' اطلاعات وارد شده صحیح نیست '
    }

    getToken(): string {
        return "";
    }

    guest(): any {
    }

    public async login(credentials: any, remember: boolean) {
        return await this.userCheck(credentials)
    }

    async logout(req: Request) {
        if (req.headers.authorization && req.headers?.authorization?.split('Bearer')[1]) {
            let token: string = req.headers?.authorization?.split('Bearer')[1]
            token = token.substring(1)
            await AuthCache.logoutAuth(token)
            return true
        } else {
            return false
        }
    }


    async userCheck(credentials: any) {
        let _obj = {}
        // @ts-ignore
        _obj[Object.keys(credentials)[0]] = credentials[Object.keys(credentials)[0]]
        let user = await db.User.findOne({
            where: _obj
        })
        if (user) {
            const passwordHashed = crypto.createHash('sha256').update(credentials['password']).digest('hex');
            if (user.dataValues.password === passwordHashed) {
                await AuthCache.removeToken(user.dataValues.token)
                let token: string = this.createToken(user)
                await user.update({
                    token
                })
                await AuthCache.setAuth(token, user)
                return token
            }

            return '  اطلاعات وارد شده صحیح نیست '
        }
        return '  اطلاعات وارد شده صحیح نیست '
    }
}

export default Jwt