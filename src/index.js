import {ApolloServer} from 'apollo-server-express'
import express from "express";
import cors from 'cors';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js'
import mongoose from "mongoose";

import {buildContext, GraphQLLocalStrategy} from 'graphql-passport';
import sessionMiddleware from "./middlewares/session.js";
//import User from "./user/Model.js";
import User from './User.js';
import bcrypt from "bcryptjs";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";

const MONGODB = 'mongodb+srv://admin:63SVJDMOEfQbRzIB@cluster0.f0znm.mongodb.net/TODO';
const PORT = process.env.PORT || 8080;

const startServer = async () => {
    const app = express();

    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
    };

    app.use(cors(corsOptions));
    //  sessionMiddleware(app)

    // passport.use(
    //     new GraphQLLocalStrategy((email, password, done) => {
    //         // Match User
    //         User.findOne({email: email.toLowerCase()})
    //             .then((user) => {
    //                 if (!user) {
    //                     return done(null, false, {message: 'Email is not registered'});
    //                 }
    //                 if (!user.password) {
    //                     return done(null, false, {
    //                         message:
    //                             'User registered with social auth. Use social auth or reset password to set it.',
    //                     });
    //                 }
    //                 // Match password
    //                 bcrypt.compare(password, user.password, (error, isMatch) => {
    //                     if (error) throw error;
    //                     if (isMatch) {
    //                         return done(null, user);
    //                     }
    //                     return done(null, false, {message: 'Incorrect password'});
    //                 });
    //             })
    //             .catch((error) => console.log(error));
    //     }),
    // );

    passport.use(
        new GraphQLLocalStrategy((email, password, done) => {
            const users = User.getUsers();
            const matchingUser = users.find(user => email === user.email && password === user.password);
            const error = matchingUser ? null : new Error('no matching user');
            done(error, matchingUser);
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const users = User.getUsers();
        const matchingUser = users.find(user => user.id === id);
        done(null, matchingUser);
    });


    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // });
    //
    // passport.deserializeUser((id, done) => {
    //     User.findById(id)
    //         .then((user) => {
    //             console.log('deserializeUser', user)
    //             done(null, user);
    //         });
    // });

    app.use(session({
        genid: (req) => Math.random(),
        secret: 'SESSION_SECRECT',
        resave: false,
        saveUninitialized: false,
    }));
    // app.use(session({
    //     secret: 'some secret',
    //     resave: false,
    //     saveUninitialized: false,
    //     store: MongoStore.create({
    //         // mongoUrl: process.env.MONGO_CONNECTION_STRING,
    //         mongoUrl: 'mongodb+srv://admin:63SVJDMOEfQbRzIB@cluster0.f0znm.mongodb.net/TODO',
    //         collectionName: 'sessions',
    //     }),
    // }));

    app.use(passport.initialize());
    app.use(passport.session());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req, res}) => buildContext({req, res, User}),
        playground: {
            settings: {
                'request.credentials': 'same-origin',
            },
        },
    });

    await server.start()
    server.applyMiddleware({app, cors: false});

    await mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})

    await new Promise(resolve => app.listen({port: PORT}, resolve));
    console.log(`Server ready at http://localhost:8080${server.graphqlPath}`);
    return {server, app};
}
startServer()
