import Queue from "vendor/core/queue/queue";
import logger from "../../config/logger";

class TestQueue extends Queue {

    public name: string = 'testQueue'
    public delay: number = 1000  // ms
    /*
    *  you also can rewrite current queue config with down properties...
    *
       //   public delay: number = 1000  // ms
       //   public removeOnComplete: boolean = true
       //   public attempts: number = 2
    *
    * */

    public handle(args: any) {
        logger.info(args)
    }

}

export default TestQueue