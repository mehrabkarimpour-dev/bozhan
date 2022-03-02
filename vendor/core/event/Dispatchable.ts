export class Dispatchable {

    private parameters: any

    public setParameters(...parameters: any) {
        return this.parameters = parameters
    }

    public async callListeners(listeners: any) {

        for (let listenersKey in listeners) {
            let _instance = new listeners[listenersKey]()
            _instance.handle(this.parameters)
        }

    }

}



