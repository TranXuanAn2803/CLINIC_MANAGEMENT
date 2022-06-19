const view = (_, res) => {
  res.render('login', { title: 'Đăng Nhập' });
};

const isAuthenticated = (req, res) => {
  if (req.user) {
    return true;
  }
  return false;
};

const logout = (req, res) => {};

module.exports = {
  view,
  logout,
  isAuthenticated
};
