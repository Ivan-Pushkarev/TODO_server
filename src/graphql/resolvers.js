import Section from "../section/Model.js";
import Task from "../task/Model.js";
import mongoose from 'mongoose';
import {PubSub} from "graphql-subscriptions";
import bcrypt from "bcryptjs";
import {ApolloError} from "apollo-server-express";
import Message from "../message/Model.js";
import newArr from "../data/index.js";
import User from "../user/Model.js";

const pubsub = new PubSub()

export default {
    Query: {
        sectionsAll: () => Section.find().exec(),
        sectionById: (_, {id}) => Section.findById(id),
        currentUser: (parent, args, context) => {
            console.log('current user context.user', context.getUser())
            return context.getUser()
        },
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
        updateSection: (parent, {
            input: {
                id,
                ...body
            }
        }) => Section.findOneAndUpdate({_id: id}, body, {useFindAndModify: false}),
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

        updateTask: (parent, {input: {id, video, description}}) => {
            const update = {}
            if (video) update.video = video
            if (description) update.description = description
            return Task.findOneAndUpdate({_id: id}, update)
        },

        signup: async (parent, {email, password}, context) => {
            try {
                const existedUser = await User.findOne({email})
                if (existedUser) {
                    throw new Error('User with email already exists');
                }
                const hashedPassword = await bcrypt.hash(password, 12)
                const _id = new mongoose.Types.ObjectId
                const newUser = new User({_id, email, password: hashedPassword});
                const savedUser = await newUser.save()
                context.login(savedUser);
                return {user: savedUser};
            } catch (err) {
                return err
            }
        },

        login: async (parent, {email, password}, context) => {
            const {user} = await context.authenticate('graphql-local', {email, password});
            context.login(user);
            return {user}
        },
        logout: (parent, args, context) => context.logout(),

        createMessage: async (parent, {text, createdBy}) => {
            const newMessage = new Message({text, createdBy})
            const res = await newMessage.save()

            pubsub.publish('MESSAGE_CREATED', {
                messageCreated: {
                    text, createdBy
                }
            })
            return res
        },
        // dataBase: async() => {
        //     for (const section of newArr) {
        //         const _id = new mongoose.Types.ObjectId
        //         const newSection = new Section({title: section.title, _id, task: []})
        //         const createdSection = await newSection.save()
        //         const sectionId = createdSection._id
        //
        //         for(const task of section.tasks){
        //
        //             const _id = new mongoose.Types.ObjectId
        //             const newTask = new Task({
        //                 _id,
        //                 section: sectionId,
        //                 description: task.description,
        //                 video: task.video
        //             })
        //             const createdTask = await newTask.save()
        //             const updatedSection =  await Section.findOneAndUpdate(
        //                 {_id:sectionId},
        //                 {$addToSet: {task: createdTask._id}}
        //             ).exec()
        //             console.log('updatedSection', updatedSection)
        //         }
        //         console.log(sectionId)
        //     }
        //     return 'done'
        // }
    },
    Subscription: {
        messageCreated: {
            subscribe: () => pubsub.asyncIterator('MESSAGE_CREATED')
        }
    }
}