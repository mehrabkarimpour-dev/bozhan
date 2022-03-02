enum UserStateEnum {
    PENDING,
    ACCEPTED,
    REJECTED,
    length
}

export default Object.values(UserStateEnum).slice(0, UserStateEnum.length)

