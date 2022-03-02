import Observer from "./Observer";
import Model from "./model";
import observerableModels from "../../../../config/observerableModels";

class modelObServerAble implements Model {

    public state: number = 0;
    public model: any

    protected constructor(model: any) {
        this.model = model
    }

    private observers: Observer[] = [];

    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) return
        for (let modelsKey in observerableModels) {
            if (this.model == observerableModels[modelsKey]) {
                this.observers.push(observer);
            }
        }
        this.notify()
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) return
        this.observers.splice(observerIndex, 1);
    }


    public notify(): void {

        for (let observer of this.observers) {
            // @ts-ignore
            let _ob = new observer()
            //_ob.update();
            _ob.get();
        }
    }
}

export default modelObServerAble