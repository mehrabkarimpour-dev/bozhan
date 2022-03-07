import {Dispatchable} from "vendor/core/event/Dispatchable";


export class LogEvent extends Dispatchable {

    public name: string = 'log'


    public registerListeners() {
        return [
            /*TestListeners1,
            TestListeners2*/
        ]
    }

    public run(...parameters: any) {
        // some code
    }


}