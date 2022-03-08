import cron from 'node-cron'
import {Container} from "../../../app/providers/AppContainer";


export class Schedule {
    constructor() {
    }



    public run() {
        Container._jobs.map(job => {
            // @ts-ignore
            let _obg = new job()
            cron.schedule(_obg.cronTime, () => {
                _obg.index()
            })
        })
    }


}