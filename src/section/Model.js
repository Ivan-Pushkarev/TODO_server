const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema({
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
const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
