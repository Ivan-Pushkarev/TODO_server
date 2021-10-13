const Section = require("./Model");

function sectionCreate (req, res) {
    const newSection = new Section({
        title: req.body.title
    })
    newSection.save()
        .then(() => {
            res.status(200).json('Section created')
        })
        .catch(()=>{
            res.status(400).json('Section wan`t created')
        })
}
module.exports = sectionCreate;