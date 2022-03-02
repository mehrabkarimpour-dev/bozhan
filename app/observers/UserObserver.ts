import observer from "../../vendor/core/observer/database/Observer";

class UserObserver implements observer {

    public create() {
        console.log('user observer is running create method')
    }

    public update(): void {
        console.log('user observer is running update method')
    }

    public get(): void {

    }

}

export default UserObserver