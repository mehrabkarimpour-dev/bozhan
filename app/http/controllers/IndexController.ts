export {}
import "reflect-metadata";
import {Request, Response} from "express";
import {Controller} from "./controller";
import {injectableServiceProvider} from '../../providers/injectableServiceProvider';
import {UserRepository} from "../../repositories/Sequelize/UserRepository";


class IndexController extends Controller {

    public userRepository: any;


    constructor() {
        super();
        this.userRepository = injectableServiceProvider.bind(UserRepository);
    }

    /**
     * @param req
     * @param res
     */
    public index = async (req: Request, res: Response) => {
        return this.render(req, res, {})
    }

}

export default IndexController