import moment from 'jalali-moment';
let timeZone = process.env.TIMEZONE || 'fa'
export let todayJalali = moment().locale(timeZone).format('YYYY/M/D');

export const jMoment = (time: string) => {
    return moment().locale(timeZone)
}

export const jMomentDiff = (time1: any, time2: any, type: string = 'minutes') => {
    try {
        return moment.duration(time1.diff(time2), 'minutes');
    } catch (e) {
        time1 = jMoment(time1)
        time2 = jMoment(time2)
        return time1.diff(time2, 'days');
    }
}


export const jalaliToGregorianStartDay = (jalaliDate: any, format: any = 'YYYY-MM-DD') => {
    return moment.from(jalaliDate, timeZone, format).startOf('day').format(format);
}

export const jalaliToGregorianEndDay = (jalaliDate: any, format: any = 'YYYY-MM-DD') => {
    return moment.from(jalaliDate, timeZone, format).endOf('day').format(format);
}

export const jalaliToGregorian = (jalaliDate: any, format: any = 'YYYY-MM-DD') => {
    return moment.from(jalaliDate, timeZone, format).format(format);
}

export const gregorianToJalali = (jalaliDate: any, format: any = 'YYYY-MM-DD') => {
    moment.locale(timeZone, {useGregorianParser: true});
    return moment(jalaliDate).format(format);// it would be in jalali system

}

