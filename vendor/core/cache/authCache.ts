import redis from "../../../app/models/redis/redis";

class AuthCache {

    public static async removeToken(token: string | undefined) {
        if (token){
            await redis.del(token)
        }
    }


    public static async setAuth(token: string, obj: any) {

        //if (obj.token)

        return await redis.set(token, obj)
    }

    public static async getAuth(token: string) {
        return await redis.get(token)
    }

    public static async logoutAuth(token: string) {
        return await redis.del(token)
    }
}

export default AuthCache