import {Schema, model} from 'mongoose';

interface Comment {
    user: object,
    title: string
}


const schema = new Schema<Comment>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true}
})


export default model<Comment>('Comment', schema)