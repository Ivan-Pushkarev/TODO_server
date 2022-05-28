const {gql} = require('apollo-server')
module.exports = gql`
    type Section {
       title: String!
       task: [Task]
    }
    type Task {
        section: Section
        description: String!
        video: String
        done: Boolean
    }
    type User {
        email: String!
        password: String!
    }
    type Query {
       sectionsAll: [Section]
       sectionById(id: ID!): Section
    }
`
