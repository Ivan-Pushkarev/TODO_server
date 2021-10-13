const mongoose = require('mongoose');
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
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
