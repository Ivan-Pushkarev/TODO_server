import MongoStore from "connect-mongo";
import session from 'express-session';
import passport from 'passport';
import bcrypt from "bcryptjs";
import {GraphQLLocalStrategy} from "graphql-passport";
import User from "../user/Model.js";
import {AuthenticationError} from "apollo-server";

const sessionMiddleware = (app) => {

    passport.use(
        new GraphQLLocalStrategy((email, password, done) => {
            console.log('HERE')
            User.findOne({email: email.toLowerCase()})
                .then((user) => {
                    if (!user) {
                        return done(new Error("Email is not registered"));
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        }
                        return done(new AuthenticationError('Incorrect password'));
                    });
                })
                .catch((error) => done(error));
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then((user) => {
                console.log('deserializeUser', user)
                done(null, user);
            });
    });
    // Express session
    app.use(
        session({
            secret: 'some secret',
            name: "myCookie",
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
               // mongoUrl: process.env.MONGO_CONNECTION_STRING,
                mongoUrl:'mongodb+srv://admin:63SVJDMOEfQbRzIB@cluster0.f0znm.mongodb.net/TODO',
                collectionName: 'sessions',
            }),
            cookie: {
                httpOnly: true, // can access from document.cookie
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                sameSite: 'none',
                secure: true,            },
        }),
    );

    app.use(passport.authenticate('session'));

    // Passport middleware
   app.use(passport.initialize());
    // Allows to use with cookies and get data from Social profiles after login
   app.use(passport.session());

   // passportStrategies(passport);

}

export default sessionMiddleware;
