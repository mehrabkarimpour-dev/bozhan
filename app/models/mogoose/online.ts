import {Schema, model} from 'mongoose';

interface Online {
    ip: string,
}


const schema = new Schema<Online>({
    ip: {type: String, required: true},
})


export default model<Online>('Online', schema)


