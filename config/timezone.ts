import moment from "moment-timezone"

let timezone: any = process.env.TIMEZONE || 'Asia/Tehran'

export const Now = () => {
    return moment.tz(timezone)
}

export const Moment = (time: string) => {
    return moment(time).tz(timezone)
}

export const MomentDiff = (time1: any, time2: any, type: any = 'minutes') => {
    try {
        return moment.duration(time1.diff(time2), type);
    } catch (e) {
        time1 = Moment(time1)
        time2 = Moment(time2)
        return time1.diff(time2, type);
    }
}
//export default moment().tz("Asia/Tehran") // asia tehran