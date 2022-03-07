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


    public index = async (req: Request, res: Response) => {
        return res.render('home')
    }

}

export default IndexController