const router = require('express').Router();
const controller = require('../controllers/report');
const controllerCheckup = require('../controllers/checkup');

router.get('/revenue', (req, res) => {
    if (req.session.user != undefined) {
        controller.viewRevenue(req, res)

    } else {
        res.redirect('/user/login')
    }

});
router.post('/revenue', controllerCheckup.saleReport);

router.get('/medicine', (req, res) => {
    if (req.session.user != undefined) {
        controller.viewMedicine(req, res)

    } else {
        res.redirect('/user/login')
    }


});
router.post('/medicine', controllerCheckup.medicineReport);

module.exports = router;