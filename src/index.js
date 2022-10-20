import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import mongoose from "mongoose";
import {buildContext} from "graphql-passport";
import sessionMiddleware from "./middlewares/session.js";
import cors from 'cors'

const PORT = 8080;

const corsOptions = {
    origin:['https://studio.apollographql.com' , 'http://localhost:3000', 'https://pasv-todo.netlify.app'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({
    typeDefs, resolvers,
});

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
app.set('trust proxy', true)
app.use(cors(corsOptions))

sessionMiddleware(app)
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
    schema,
    context: ({req, res}) => buildContext({req, res}),
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});
await mongoose.connect('mongodb+srv://admin:63SVJDMOEfQbRzIB@cluster0.f0znm.mongodb.net/TODO',
    {useNewUrlParser: true, useUnifiedTopology: true})

await server.start();
server.applyMiddleware({ app, cors: corsOptions });


// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
    console.log(
        `Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
        `Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
});

