import mongoose from "mongoose";
import databaseConfig from "../../../config/database";


mongoose.Promise = global.Promise;
let mongoConn: any

if (process.env.ACTIVE_MONGODB == 'true') {
    mongoose.connect(databaseConfig.mongoUrl,)
    mongoConn = mongoose.connection;

}

export default mongoConn;



