import {Controller} from "../controller";
import {NextFunction, Request, Response} from "express";
import {UserRepository} from "../../../repositories/Sequelize/UserRepository";
import {injectableServiceProvider} from "../../../providers/injectableServiceProvider";
import crypto from "crypto";

export {}


class RegisterController extends Controller {

    public userRepository: any;

    constructor() {
        super();
        this.userRepository = injectableServiceProvider.bind(UserRepository);
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        const hash = crypto.createHash('sha256').update('121212').digest('hex');

        let newUserParams = {
            organizationId: req.body.organizationId,
            mobile: req.body.mobile,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        }
        let newUserCreated = await this.userRepository.create(newUserParams)

        if (newUserCreated)
            return next()
        return res.json(newUserCreated.dataValues)
    }


}

export default RegisterController