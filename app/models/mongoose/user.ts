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
    // save middleware
})

schema.pre('remove', function () {
    // remove middleware
})

schema.pre('find', function () {
    // setter
})

export default model<User>('User', schema)


