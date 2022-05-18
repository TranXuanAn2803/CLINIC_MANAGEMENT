const router = require('express').Router();
const controller = require('../controllers/constraint');

router.get('/', controller.view);

module.exports = router;
