import events from "node:events"
import {injectableServiceProvider} from "../providers/injectableServiceProvider";
import {LogEvent} from "./published/logEvent";

const registerEvents = [
    LogEvent
]


class index extends events {
}

const Event = injectableServiceProvider.bind(index);


registerEvents.map(event => {
    let _EventObj = injectableServiceProvider.bind(event)
    Event.on(_EventObj.name, (...args: any) => {
        setTimeout(() => {
            _EventObj.run(...args)
            _EventObj.setParameters(...args)
            _EventObj.callListeners(_EventObj.registerListeners())
        }, 10)
    })
})


export default Event;