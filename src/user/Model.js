const mongoose = require('mongoose');
const { Schema } = mongoose;
const emailRegExp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const userSchema = new Schema({
    email:  {
        type: String,
        required: true,
        unique:true,
        match:emailRegExp
    },
    password: {
        type:String,
        required: true
    }
   });
const User = mongoose.model('User', userSchema);
module.exports = User;
