const router = require('express').Router();
const controller = require('../controllers/usermanual');

router.get('/', (req, res) => {
    if (req.session.user != undefined) {

        controller.view(req, res)

    } else {
        res.redirect('/user/login')
    }

});
router.post('/add', controller.addUsermanual);
router.post('/edit', controller.editUsermanual);
router.post('/delete', controller.deleteUsermanual);

module.exports = router;