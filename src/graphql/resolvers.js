const Section = require("../section/Model");
const Task = require("../task/Model");
const mongoose = require("mongoose");

module.exports = {
    Query: {
        sectionsAll: () => Section.find().exec(),
        sectionById: (_, {id}) => Section.findById(id)
    },
    Section: {
        task: (parent) => Task.find({section: parent._id})
    },
    Task: {
        section: (parent) => Section.findById(parent.section)
    },
    Mutation: {
        createSection: (parent, {input}) => {
            const _id = new mongoose.Types.ObjectId();
            const newSection = new Section({title: input, _id})
            return newSection.save()
        },
        updateSection: (parent, { input: { id,...body }}) => Section.findOneAndUpdate({_id: id}, body, {useFindAndModify: false}),
        deleteSection: async (parent, {id}) => {
           const deletedSection = await Section.findByIdAndDelete(id)
           deletedSection.task.forEach(el =>
               Task.deleteOne({_id: el})
                   .then(() => {
                       console.log('task was deleted', el)
                   })
                   .catch(() => {
                       console.log('task delete error')
                   })
           )
            return deletedSection
        },

        createTask: (parent, {input: {description, section}}) => {
            const _id = new mongoose.Types.ObjectId
            const newTask = new Task({
                _id, section, description,
            })
            Section.findOneAndUpdate(
                {_id: section},
                {$addToSet: {task: _id}}
            )
                .exec()
                .then((doc) => {
                    if (doc) {
                        console.log('Task added to Section. Success')
                    } else {
                        console.log('Task did not add to Section. Section not found')
                    }
                })
                .catch((err) => {
                    console.log('Section update error', err)
                })
            return newTask.save()
        },

        deleteTask: async (parent, {id}) => {
            const deletedTask = await Task.findOneAndDelete({_id: id})
            await Section.findOneAndUpdate(
                {_id: deletedTask.section},
                {$pull: {task: id}})
            return deletedTask
        },

        updateTask: (parent, {input:{id, video, description}}) => {
            const update = {}
            if (video) update.video = video
            if (description) update.description = description
            return Task.findOneAndUpdate({_id: id}, update)
        }
    }
}