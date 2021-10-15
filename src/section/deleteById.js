const Section = require("./Model");
const Task = require("../task/Model");

function sectionDelete(req, res) {
    const sectionId = req.params.sectionId;
    
    Section.findOneAndDelete({_id: sectionId})
        .exec()
        .then((item) => {
            item.task.forEach(el =>
                Task.deleteOne({_id: el})
                    .then(() => {
                        console.log('task was deleted', el)
                    })
                    .catch(() => {
                        console.log('task delete error')
                    })
            )
            res.status(200).json('Section was deleted')
        })
        .catch(() => {
            res.status(400).json('Section delete error')
        })
}
module.exports = sectionDelete;
