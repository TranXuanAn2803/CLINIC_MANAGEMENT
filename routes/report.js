const router = require('express').Router();
const controller = require('../controllers/report');
const controllerCheckup = require('../controllers/checkup');

router.get('/', (req, res) => {
    if (req.session.user != undefined) {
        controller.view(req, res)

    } else {
        res.redirect('/user/login')
    }

});
router.post('/revenue', controllerCheckup.saleReport);

router.get('/', (res, req) => {
    if (req.session.user) {
        controller.view(req, res)

    } else {
        res.redirect('/user/login')
    }

});
router.post('/medicine', controllerCheckup.medicineReport);

module.exports = router;