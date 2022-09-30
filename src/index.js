import {ApolloServer} from 'apollo-server-express'
import express from "express";
import cors from 'cors';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js'
import mongoose from "mongoose";

import * as http from "http";

import {buildContext} from 'graphql-passport';
import sessionMiddleware from "./middlewares/session.js";

const MONGODB = 'mongodb+srv://admin:63SVJDMOEfQbRzIB@cluster0.f0znm.mongodb.net/TODO';
const PORT = process.env.PORT || 8080;

const startServer = async () => {
    const app = express();
    //const httpServer = http.createServer(app);

    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
    };
    app.use(cors(corsOptions));
    sessionMiddleware(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => buildContext({ req, res }),
    });

    await server.start()
    server.applyMiddleware({app, cors: corsOptions});

    await mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})

    await new Promise(resolve => app.listen({ port: PORT }, resolve));
    console.log(`Server ready at http://localhost:8080${server.graphqlPath}`);
    return { server, app };
}
startServer()
