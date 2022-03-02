import {createClient} from 'redis';
import logger from "../../../config/logger";


class redis {

    protected client: any
    protected connection: any

    constructor() {
        this.client = createClient();
        this.client.connect()
        this.client.on('error', (err: any) => console.log('Redis Client Error', err));
    }

    private _arrayToJson = (arr: object) => {
        return JSON.stringify(arr)
    }

    public set = async (key: string, value: any) => {
        this.client.on('error', (err: any) => {
            logger.error(err)
            console.log('Redis Client Error', err)
        });
        if (typeof value === "object")
            value = this._arrayToJson(value)
        await this.client.set(key, value)
    }

    public del = async (key: string) => {
        this.client.on('error', (err: any) => {
            logger.error(err)
            console.log('Redis Client Error', err)
        });
        return await this.client.del(key)
    }

    public get = async (key: string) => {
        this.client.on('error', (err: any) => {
            logger.error(err)
            console.log('Redis Client Error', err)
        });
        return await this.client.get(key)
    }


}

export default new redis

