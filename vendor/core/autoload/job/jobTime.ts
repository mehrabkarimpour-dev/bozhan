export const everyHour = (): string => {
    return '0 */1 * * * '
}

export const everyHours = (hour: number = 1): string => {
    return '0 */' + hour + ' * * * '
}

export const everyMinute = (): string => {
    return '*/1 * * * * '
}

export const everyMinutes = (minutes: number = 1): string => {
    return '*/' + minutes + ' * * * * '
}

export const everySeconds = (seconds: number = 1): string => {
    return '*/' + seconds + ' * * * * * '
}
