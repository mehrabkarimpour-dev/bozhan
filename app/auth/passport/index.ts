import passport from "passport";
import User from "../../models/mogoose/user";
import bcrypt from "bcryptjs";

const LocalStrategy = require('passport-local').Strategy

export default () => {

    passport.use(new LocalStrategy((name: any, password: any, done: any) => {
        User.find({name}, (error, user: any) => {

            if (error) throw error

            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })

        })
    }))

    passport.serializeUser((user: any, done) => {
        done(null, user);
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err: any, user: any) {
            done(err, user);
        });
    });

}