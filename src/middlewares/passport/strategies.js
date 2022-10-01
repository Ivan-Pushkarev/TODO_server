import {GraphQLLocalStrategy} from "graphql-passport";
import bcrypt from 'bcryptjs';
import User from "../../user/Model.js";

function passportStrategies(passport) {

    passport.use(
        new GraphQLLocalStrategy( (email, password, done) => {
            // Match User
            User.findOne({ email: email.toLowerCase() })
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'Email is not registered' });
                    }

                    if (!user.password) {
                        return done(null, false, {
                            message:
                                'User registered with social auth. Use social auth or reset password to set it.',
                        });
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (error, isMatch) => {

                        if (error) throw error;

                        if (isMatch) {
                            return done(null, user);
                        }
                        return done(null, false, { message: 'Incorrect password' });
                    });
                })
                .catch((error) => console.log(error));
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
}

export default passportStrategies;
