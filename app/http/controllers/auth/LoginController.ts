export {}
import {Controller} from "../controller";
import {NextFunction, Request, Response} from "express";
import {UserRepository} from "../../../repositories/mongoose/UserRepository";
import {injectableServiceProvider} from "../../../providers/injectableServiceProvider";
import Jwt from "../../../auth/jwt";

const passport = require('passport')


class LoginController extends Controller {


    public userRepository: any;
    public jwtAuth: any;

    constructor() {
        super();
        this.userRepository = injectableServiceProvider.bind(UserRepository);
        this.jwtAuth = injectableServiceProvider.bind(Jwt)
    }

    public index = async (req: Request, res: Response) => {
        let tokenOrError = await this.jwtAuth.login(req.body)
        return res.status(200).json({
            status: true,
            message: '',
            data: tokenOrError
        })
    }


    public authLogin = (req: Request, res: Response, next: NextFunction) => {
        return passport.authenticate('local', {
            successRedirect: '/api/success',
            failureRedirect: '/api/error',
            failureFlash: true
        })(req, res, next)
    }


}

export default LoginController