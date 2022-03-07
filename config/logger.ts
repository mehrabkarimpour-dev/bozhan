import logger from "pino";
import dayjs from "dayjs";

const log = logger({
        messageKey: process.env.MESSAGE_KEY || 'msg',
        //levelKey: process.env.LEVEL_KEY || 'level',
        // @ts-ignore
        messageFormat: `id:{reqId}  time:{responseTime}`,
        timestampKey: process.env.TIMESTAMPE_KEY || 'time',
        translateTime: process.env.TRANSLATE_TIME || false,
        ignore: process.env.IGNORE || 'pid,hostname',
        hideObject: process.env.HIDE_OBJECT || false,
        singleLine: process.env.SINGLE_LINE || false,
        customPrettifiers: {},
        timestamp: () => `"time":"${dayjs().format()}"`
    },
    logger.destination("./storage/logs/" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + ".log")
)

export default log;