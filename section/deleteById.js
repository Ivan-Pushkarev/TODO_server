const Section = require("./Model");

function sectionDelete (req, res) {
   
   const sectionId = req.params.sectionId;
   Section.deleteOne({ _id: sectionId })
       .then(() => {
          res.status(200).json('Section was deleted');
       })
       .catch((err) => {
          console.log(err);
          res.status(400).json('Section delete error');
       });
}
module.exports = sectionDelete;
