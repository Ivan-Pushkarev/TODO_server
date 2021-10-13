const Section = require("./Model");

function sectionUpdateById(req, res) {
    const sectionId = req.params.sectionId;
    
    Section.updateOne({ _id: sectionId }, req.body)
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