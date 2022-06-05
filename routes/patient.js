const router = require('express').Router();
const controller = require('../controllers/patient');

router.get('/', controller.view);

module.exports = router;