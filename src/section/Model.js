import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sectionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title:  {
        type: String,
        required: true,
    },
    task:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: false
        }
    ]
   });

export default model('Section', sectionSchema);

