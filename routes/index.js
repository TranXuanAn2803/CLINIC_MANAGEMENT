const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user != undefined) {
        res.render('index', { title: 'Express' });

    } else {
        res.redirect('/user/login')

    }

});
module.exports = router;