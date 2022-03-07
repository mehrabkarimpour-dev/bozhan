import logger from "../../config/logger";

class TestJob {

    /*
    *   set cron job time .
    *      second  minute   hour   day of month.   month   day of week
    *         *      *       *          *           *          *
    * */
    public cronTime: string = '*/1 * * * * *'

    public index = async () => {

    }
}

export default TestJob