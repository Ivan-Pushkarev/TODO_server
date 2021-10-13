const Task = require("./Model");

function taskGetAll (req, res) {
    Task.find()
        .exec()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(() =>{
            res.status(400).json('Task get all error')
        
        })
 }
module.exports = taskGetAll;