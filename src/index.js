const express = require('express');
const routes = require("./middlewares/routes");
const bodyParser = require('./middlewares/bodyParser');
const dbConnection = require("./middlewares/dbConnection");
const cors = require("./middlewares/cors");
const logger = require("./middlewares/logger");
const { ApolloServer }= require('apollo-server')
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const mongoose = require("mongoose");
const MONGODB =  'mongodb+srv://admin:63SVJDMOEfQbRzIB@cluster0.f0znm.mongodb.net/TODO';
const app = express();
const PORT = process.env.PORT || 8000;

const server = new ApolloServer({
    typeDefs,
    resolvers
})
//dbConnection();
//logger(app);
//bodyParser(app);
//cors(app);
//routes(app);
// server.listen(PORT, () => {
//     console.log(`TODO server listening at http://localhost:${PORT}`)
// })

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: PORT});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });