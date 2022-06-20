const passport = require('../config/passport');

const view = (_, res) => {
    res.render('login', { title: 'Đăng Nhập' });
};
const failView = (_, res) => {
    res.render('login', { title: 'Đăng Nhập', message: "***Tài Khoản hoặc Mật Khẩu sai***" });
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
    failView,
    logout,
    isAuthenticated
};