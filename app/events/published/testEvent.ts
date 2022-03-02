import {Dispatchable} from "../../../vendor/core/event/Dispatchable";
import {TestListeners1} from "../../listeners/testListeners1";
import {TestListeners2} from "../../listeners/testListeners2";

export class TestEvent extends Dispatchable {

    public name: string = 'testEvent'


    public registerListeners() {
        return [
            TestListeners1,
            TestListeners2
        ]
    }

    public run(...parameters: any) {
        // some code
        console.log(parameters[0])
    }


}