import axios from "axios";

class TestJob {

    /*
    *   set cron job time .
    *      second  minute   hour   day of month.   month   day of week
    *         *      *       *          *           *          *
    * */
    public cronTime: string = '*/1 * * * * *'

    public index = async () => {
        // some code
    }
}

export default TestJob