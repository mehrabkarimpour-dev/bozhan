import Queue from "bull";
import registeredQueues from "../../../app/queue";

let Queues: any = {}
let queueDriverRedis: any = {
    host: '127.0.0.1',
    port: process.env.REDIS_PORT || 6379/*,
    password: 'root'*/
}

registeredQueues.map((queue: any) => {
    let queueObj = new queue()
    let newQueue = new Queue(queueObj.name, {
        redis: queueDriverRedis
    })
    Queues[queueObj.name] = newQueue;
    newQueue.process((jobArgs: any) => {
        queueObj.handle(jobArgs.data);
    })
    Queues[queueObj.name].submit = (args: any) => {
        let jobOptions = {
            removeOnComplete: queueObj.removeOnComplete,
            delay: queueObj.delay,
            attempts: queueObj.attempts
        }
        Queues[queueObj.name].add(args, jobOptions)
    }
})

export default Queues