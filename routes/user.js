const router = require('express').Router();
const controller = require('../controllers/user');
const passport = require('../config/passport');

router.get('/login', controller.view);

router.post('/login', passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: '/user/login'

    }),
    function(req, res) {
        if (req.user) {
            req.session.user = true
            res.redirect('/')
        }
    }

);
router.get('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/')


})
module.exports = router;