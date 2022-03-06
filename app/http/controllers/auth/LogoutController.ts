import {NextFunction} from "express";
import {Controller} from "../controller";
import {injectableServiceProvider} from "../../../providers/injectableServiceProvider";
import Jwt from "../../../auth/jwt";
import Auth from "../../../../vendor/core/Auth";

class LogoutController extends Controller {

    public jwtAuth: Auth;

    constructor() {
        super();
        this.jwtAuth = injectableServiceProvider.bind(Jwt)
    }

    public async index(req: Request, res: Response, next: NextFunction) {

        // @ts-ignore
        await this.jwtAuth.logout(req)
        // @ts-ignore
        return res.json(req.auth)
    }

}

export default LogoutController