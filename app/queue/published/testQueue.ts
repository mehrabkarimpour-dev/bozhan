import Queue from "vendor/core/queue/queue";

class TestQueue extends Queue {

    public name: string = 'testQueue'
    /*
    *  you also can rewrite current queue config with down properties...
    *
       //   public delay: number = 1000  // ms
       //   public removeOnComplete: boolean = true
       //   public attempts: number = 2
    *
    * */

    public handle(args: any) {
        console.log(args)
    }

}

export default TestQueue