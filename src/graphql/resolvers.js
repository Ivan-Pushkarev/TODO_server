const Section = require("../section/Model");
const Task = require("../task/Model");

module.exports = {
    Query: {
        sectionsAll: (parent, args) => Section.find().exec(),
        sectionById: (_, { id }) => Section.findById(id)
    },
    Section: {
        task: (parent) => Task.find({section: parent._id})
    },
    Task: {
        section: (parent) => Section.findById(parent._id)
    }
}