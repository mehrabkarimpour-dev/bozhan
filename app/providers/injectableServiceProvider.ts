import {container} from "tsyringe";


export class injectableServiceProvider {

    public static bind(object: any): any {
        return container.resolve(object)
    }

}