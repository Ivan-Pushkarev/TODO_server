const Task = require("./Model");
const Section = require("../section/Model");

function taskDelete(req, res) {
    const taskId = req.params.taskId;
    
    Task.findOneAndDelete({_id: taskId})
        .exec()
        .then((item) => {
            
            const sectionId = item.section
            Section.findOneAndUpdate(
                    {_id: sectionId},
                    {$pull: {task: taskId}}
                )
                .then(() => res.status(200).json('Task was deleted'))
                .catch((err) => {
                    console.log(err);
                    res.status(400).json('Task delete error');
                })
        })
        .catch(() => {
            res.status(400).json('Task delete error');
        })
}


module.exports = taskDelete;
