import {AuthMiddleware} from "./published/authMiddleware";
import {NextFunction, Request, Response} from "express";
import loginRequest from "../requests/loginRequest";
import {RoleMiddleware} from "./published/roleMiddleware";
import {PermissionMiddleware} from "./published/permissionMiddleware";

const registerMiddleware: any = [
    AuthMiddleware,
    loginRequest,
    RoleMiddleware,
    PermissionMiddleware
]


export const middlewareNotFound = (req: Request, res: Response, next: NextFunction) => {
    throw new Error(`middleware dos not exists!`)
}

export default registerMiddleware

