const router = require('express').Router();
const controller = require('../controllers/report');

router.get('/revenue', controller.viewRevenue);

module.exports = router;
