import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportStrategies from "./passport/strategies.js";

const sessionMiddleware = (app) => {
    app.use(cookieParser());

    // Express session
    app.use(
        session({
            secret: 'some secret',
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
               // mongoUrl: process.env.MONGO_CONNECTION_STRING,
                mongoUrl:'mongodb+srv://admin:63SVJDMOEfQbRzIB@cluster0.f0znm.mongodb.net/TODO',
                collectionName: 'sessions',
            }),
            // TODO settings for connect.sid cookie поменять домен
            cookie: {
                httpOnly: true, // can access from document.cookie
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                sameSite: 'none',
                secure: false,
                secureProxy: true
            },
        }),
    );


    //app.use(passport.authenticate('session'));

    // Passport middleware
   app.use(passport.initialize());
    // Allows to use with cookies and get data from Social profiles after login
   app.use(passport.session());

   passportStrategies(passport);

}

export default sessionMiddleware;
