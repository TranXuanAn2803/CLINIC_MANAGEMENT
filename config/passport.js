const async = require("hbs/lib/async");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const api = require('../models/api/constraint');

passport.use(
    new LocalStrategy(async function(username, password, done) {
        try {
            var user = null
            const name = await api.username
            if (username === name.username) {
                user = true;
            }
            console.log(name)

            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (!validPassword(password)) {

                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

const validPassword = async(password) => {
    const pass = await api.password
    console.log(pass.password)
    return password === pass.password;
};

passport.serializeUser(function(user, done) {
    done(null, user);
});


module.exports = passport;