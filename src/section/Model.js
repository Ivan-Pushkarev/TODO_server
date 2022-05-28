const mongoose = require('mongoose');
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
module.exports = model('Section', sectionSchema);

