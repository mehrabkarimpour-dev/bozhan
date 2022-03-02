import exp from "constants";

const passport = require('passport')
import db from "../../models/sequelize";

const LocalStrategy = require('passport-local').Strategy


export default function () {
    passport.use('local.login', new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password',
        resReqToCallback: true
    }, (req: any, name: any, password: any, done: any) => {

        console.log(req.body)
        db.User.findOne({'name': req.name}, (err: any, user: any) => {

            if (err) return done(err)
            if (!user) return done(null, false, req.flash('errors', 'invalid data'))
            done(null, user)
        })
    }))
}











