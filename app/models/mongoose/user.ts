import {Schema, model} from 'mongoose';

interface User {
    name: string,
    email: string,
    password: string,
    comments: object
}


const schema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: false},
    password: {type: String, required: true},
    comments: {type: Schema.Types.ObjectId, ref: 'Comment'}
})

schema.pre('save', function (next) {
    console.log('save middleware')
    next()
})

schema.pre('init', function () {
    console.log('save middleware')
})

schema.pre('remove', function () {
    console.log('remove middleware')
})

schema.pre('find', function () {
    console.log('setter ')
})

export default model<User>('User', schema)


