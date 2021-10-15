const Task = require("./Model");
const Section = require("../section/Model");
const mongoose = require("mongoose");

function taskCreate(req, res) {
    const _id = new mongoose.Types.ObjectId
    const newTask = new Task({
        _id,
        section: req.body.section,
        description: req.body.description,
    })
    
    Section.findOneAndUpdate(
        {_id:req.body.section},
        {$addToSet:{task:_id}}
    )
        .exec()
        .then((doc) =>{
            if(doc) {
                console.log('Task added to Section. Success')
            } else {
                console.log('Task did not add to Section. Section not found')
            }
        })
        .catch((err)=>{
            console.log('Section update error', err)
        })
   
    newTask.save()
        .then(() => {
            res.status(200).json('Task created')
        })
        .catch(() => {
            res.status(400).json('Task wan`t created')
        })
}

module.exports = taskCreate;