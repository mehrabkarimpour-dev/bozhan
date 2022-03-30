import 'dotenv'


export default {
    mongoUrl: "mongodb://" + process.env.MONGO_HOST || 'localhost' +
        ":" + process.env.MONGO_PORT || 12017 + "/" +
        process.env.MONGO_DATABASE || 'bozhan' + ""
}

export const mongodb = {}

export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379
}

export const mysql = {}

