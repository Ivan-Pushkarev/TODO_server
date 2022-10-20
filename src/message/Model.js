import mongoose from "mongoose";
const {Schema, model} = mongoose

const messageSchema = new Schema({
    text: String,
    createdBy: String
})
const Message = model('Message', messageSchema)
export default Message