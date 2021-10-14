const Section = require("./Model");

function sectionUpdateById(req, res) {
    const sectionId = req.params.sectionId;
    const newTitle = req.body.title;
    
    Section.findOneAndUpdate(
            {_id: sectionId},
            {title: newTitle}
        )
        .exec()
        .then(() => {
            res.status(200).json('Section was updated');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Section update error');
        });
}

module.exports = sectionUpdateById;