import 'dotenv'


export default {
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/testdatabase"
}

export const mongodb = {}

export const redisConfig = {
    host: process.env.REDIS_HOST,
    port : process.env.REDIS_PORT || 6379
}

export const mysql = {}

