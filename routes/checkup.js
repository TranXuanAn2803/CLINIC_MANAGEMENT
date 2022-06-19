const router = require('express').Router();
const controller = require('../controllers/checkup');

router.get('/', controller.view);

module.exports = router;