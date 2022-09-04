const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const mongoose = require("mongoose");
const MONGODB =  'mongodb+srv://admin:63SVJDMOEfQbRzIB@cluster0.f0znm.mongodb.net/TODO';
const PORT = process.env.PORT || 8080;

const server = new ApolloServer({
    typeDefs,
    resolvers
})
mongoose.connect(MONGODB, {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: PORT});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });