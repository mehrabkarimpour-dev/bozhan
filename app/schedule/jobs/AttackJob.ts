import axios from "axios";
import {everyMinute} from "../../../vendor/core/autoload/job/jobTime";
import db from "../../models/sequelize";

class AttackJob {

    /*
    *   set cron job time .
    *      second  minute   hour   day of month.   month   day of week
    *         *      *       *          *           *          *
    *    you can also use the cron helper functions ,
    *     example like everyMinute() or everyHours(4) or  everyMinutes(30)
    * */

    public cronTime: string = everyMinute()

    public index = async () => {
        let users = await db.User.findAll({})
        console.log(users)
    }
}

export default AttackJob