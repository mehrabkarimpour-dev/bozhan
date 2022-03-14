import {Dispatchable} from "vendor/core/event/Dispatchable";


export class LogEvent extends Dispatchable {

    public name: string = 'log'

    /**
     * @return Array
     */
    public registerListeners() {
        return [
            /*TestListeners1,
            TestListeners2*/
        ]
    }

    /**
     * @param parameters
     */
    public run(...parameters: any) {
        for (let i = 0; i < 100000; i++) {
            console.log(i)
        }
    }


}