const router = require('express').Router();
const controller = require('../controllers/report');

router.get('/revenue', controller.viewRevenue);

router.get('/medicine', controller.viewMedicine);

module.exports = router;
