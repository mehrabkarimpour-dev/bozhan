import cron from 'node-cron'
import {_jobs} from "../../../app/providers/AppContainer";

export class Schedule {
    constructor() {
    }



    public run() {
        _jobs.map(job => {
            // @ts-ignore
            let _obg = new job()
            cron.schedule(_obg.cronTime, () => {
                _obg.index()
            })
        })
    }


}