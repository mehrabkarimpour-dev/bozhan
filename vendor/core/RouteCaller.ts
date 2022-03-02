//@ts-ignore
import {injectableServiceProvider} from "../../app/providers/injectableServiceProvider";
import registerMiddleware, {middlewareNotFound} from "../../app/http/middleware";

class Call {

    constructor() {
    }

    public static middleware(middleware: string) {
        let middlewareMustBeRunning = registerMiddleware.find((_middleware: any) => _middleware.name === middleware)
        if (middlewareMustBeRunning) {
            return middlewareMustBeRunning.run
        }
        return middlewareNotFound
    }

    public static controller(controller: any, method: string) {
        let ctl = new controller()
        return ctl[method];
    }

    public ctlCall = (controller: string) => {

        // @ts-ignore
        const newController = require(`../../app/http/controllers/${controller}`)
        let ctl = new newController();
        console.log('ctl__')
        return ctl;

    }

}

export default Call;