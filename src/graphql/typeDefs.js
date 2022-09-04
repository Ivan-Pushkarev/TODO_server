const {gql} = require('apollo-server')
module.exports = gql`
    type Section {
       _id: ID
       title: String!
       task: [Task]
    }
    type Task {
        _id: ID!
        section: Section
        description: String!
        video: String
        done: Boolean
    }
    type User {
        email: String!
        password: String!
    }
    input SectionInput {
        id: ID
        title: String!       
    }
    input CreateTaskInput {
        section: ID!
        description: String       
    }
    input EditTaskInput {
        id: ID!
        description: String
        video: String
    }
    type Query {
       sectionsAll: [Section]
       sectionById(id: ID!): Section
    }   
    type Mutation {
        createSection(input: String!): Section!
        updateSection(input: SectionInput): Section
        deleteSection(id: ID!): Section
        
        createTask(input: CreateTaskInput!): Task
        updateTask(input: EditTaskInput!): Task
        deleteTask(id: ID!): Task
    }
`
