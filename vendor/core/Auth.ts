import {Request} from "express";

interface Auth {

    login(credentials: object, remember: boolean): any

    guest(): any

    logout(req: Request):any

    userCheck(credentials: any): any

    createToken(variant: object): any

    getToken(): string

}


export default Auth;