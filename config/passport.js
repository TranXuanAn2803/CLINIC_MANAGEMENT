const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const model = require('../models/api/constraint');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async(username, password, done) => {
    try {
        const name = await model.username();
        const pass = await model.password();

        if (!user) { return done(null, false); }
        if (!valid(username, password, name, pass)) { return done(null, false); }
        return done(null, username);
    } catch (err) {
        done(err);
    }
}));

const valid = (username, password, name, pass) => {
    if (username == name && password == pass) {
        return true;
    } else {
        return false;
    }
};

passport.serializeUser((username, done) => {
    return done(null, { username: username });
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});

module.exports = passport;