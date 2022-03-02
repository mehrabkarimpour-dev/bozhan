import Queue from 'bull'
import testQueue from "./published/testQueue";


let registeredQueues = [
    testQueue
]

let queues: any = {}
let queueDriverRedis = {
    host: '127.0.0.1',
    port: 6379/*,
    password: 'root'*/
}

registeredQueues.map((queue: any) => {
    let queueObj = new queue()
    let newQueue = new Queue(queueObj.name, {
        redis: queueDriverRedis
    })
    queues[queueObj.name] = newQueue;
    newQueue.process((job: any) => {
        queueObj.handle(job);
    })
})

export default queues
