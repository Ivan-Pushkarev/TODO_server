const Section = require("./Model");

function sectionGetAll (req, res) {
    Section.find()
        .populate('task')
        .exec()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(() =>{
            res.status(400).json('Section get all error')
        
        })
 }
module.exports = sectionGetAll;