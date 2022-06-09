const passport = require('../config/passport');

const view = (_, res) => {
  res.render('login', { title: 'Đăng Nhập' });
};

const login = passport.authenticate('local', {
  successRedirect: '',
  failureRedirect: ''
});

const logout = (req, res) => {};

module.exports = {
  view,
  login,
  logout
};
