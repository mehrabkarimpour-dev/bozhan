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
        let data = [
            {
                id: 1
            },
            {
                id: 2
            }
        ]
        return this.render(req, res, data)
    }

}

export default IndexController