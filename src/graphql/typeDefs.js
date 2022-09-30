import {gql} from 'apollo-server'
export default gql`
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
        _id: ID        
        email: String
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
    type AuthPayload {
        user: User
    }
    type Query {
       sectionsAll: [Section]
       sectionById(id: ID!): Section
       currentUser: User
    }   
    type Mutation {
        createSection(input: String!): Section!
        updateSection(input: SectionInput): Section
        deleteSection(id: ID!): Section
        
        createTask(input: CreateTaskInput!): Task
        updateTask(input: EditTaskInput!): Task
        deleteTask(id: ID!): Task

        signup(email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        logout: Boolean
    }
`
