const Task = require("./Model");

function taskUpdateById(req, res) {
    const taskId = req.params.taskId;
    const newVideo = req.body.video
    
    Task.findById(taskId)
        .exec()
        .then((doc) => {
            doc.video = newVideo
            doc.save()
                .then(() => {
                    res.status(200).json('Video link was added');
                })
                .catch((err) => {
                    res.status(400).json('Task update error');
                });
        })
    
    // Task.updateOne({ _id: taskId }, req.body)
    //     .exec()
    //     .then(() => {
    //         res.status(200).json('Task was updated');
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(400).json('Task update error');
    //     });
}

module.exports = taskUpdateById;