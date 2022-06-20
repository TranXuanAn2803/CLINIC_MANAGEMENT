const router = require('express').Router();
const controller = require('../controllers/checkup');

router.get('/', controller.view);

router.get('/edit/:id', controller.viewEditCheckup);

router.get('/bill/:id', controller.viewBill);

module.exports = router;
