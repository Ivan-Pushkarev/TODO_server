import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
    section:  {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: true,
    },
    description: {
        type:String,
        required: true
    },
    video:   String,
    done: {
        type: Boolean,
        default: false
    }
   });

export default mongoose.model('Task', taskSchema);

