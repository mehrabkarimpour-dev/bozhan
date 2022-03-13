import Event from "../../../vendor/core/event/event";

var childProcess = require("child_process");
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

        Event.emit('log')

        /*for (let i = 0; i < 1; i++) {

            let workerProcess = childProcess.exec('node support.js ' + i,
                function (error: any, stdout: any, stderr: any) {
                    if (error) {
                        console.log(error.stack);
                        console.log('Error code: ' + error.code);
                        console.log('Signal received: ' + error.signal);
                    }
                    for (let i = 0; i < 100000; i++) {
                        console.log(i)


                        console.log('_____________________________')
                    }
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                });

            workerProcess.on('exit', function (code: any) {
                console.log('子进程已退出，退出码 ' + code);
            });
        }*/
        return res.render('home')
    }

}

export default IndexController