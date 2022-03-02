import cron from 'node-cron'
import TestJob from "./jobs/TestJob";

export class Schedule {
    constructor() {
    }

    public registerJobs() {
        return [
            TestJob
        ]
    }

    public run() {
        this.registerJobs().map(job => {
            // @ts-ignore
            let _obg = new job()
            cron.schedule(_obg.cronTime, () => {
                _obg.index()
            })
        })
    }


}