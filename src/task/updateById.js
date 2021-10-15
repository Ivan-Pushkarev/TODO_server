const Task = require("./Model");

function taskUpdateById(req, res) {
    const taskId = req.params.taskId;
    const {video, description} = req.body
    
    const update = {}
    if(video) update.video = video
    if(description) update.description = description
    
    Task.findOneAndUpdate({_id: taskId}, update)
        .exec()
        .then(() => {
                    res.status(200).json('Video link was added');
                })
                .catch(() => {
                    res.status(400).json('Task update error');
                });
}

module.exports = taskUpdateById;