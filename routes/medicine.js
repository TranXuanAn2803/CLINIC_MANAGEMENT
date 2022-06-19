const router = require('express').Router();
const controller = require('../controllers/medicine');

router.get('/', (req, res) => {
    if (req.session.user != undefined) {
        controller.view(req, res)

    } else {
        res.redirect('/user/login')
    }

});
router.post('/add', controller.addMedicine);
router.post('/edit', controller.editMedicine);

router.post('/delete', controller.deleteMedicine);

module.exports = router;