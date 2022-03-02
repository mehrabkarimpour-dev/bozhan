export function required(field: string) {
    return ` وارد کردن ${field} ضروری است `
}

export function max(field: string, value: any) {
    return " حداکثر مقدار برای " + field + " " + value + " کاراکتر میباشد "
}

export function min(field: string, value: any) {
    return " حداقل مقدار برای " + field + " " + value + " کاراکتر میباشد "
}

export function integer(field: string) {
    return `مقدار ${field} باید عددی باشد `
}

export function string(field: string) {
    return `مقدار ${field} باید رشته متنی باشد  `
}

export function incorrect(field: string) {
    return ` فرمت وارد شده برای ${field} صحیح نیست `
}

export function alreadyExists(field: string) {
    return ` ${field} قبلا ثبت شده است `
}

export function notExists(field: string) {
    return ` ${field} قبلا ثبت نشده است `
}




