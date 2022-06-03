const passport = require('../config/passport');

const login = passport.authenticate('local', {
  successRedirect: '',
  failureRedirect: ''
});

const logout = (req, res) => {};

module.exports = {
  login,
  logout
};
