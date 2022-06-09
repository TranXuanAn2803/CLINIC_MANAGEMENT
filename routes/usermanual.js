const router = require('express').Router();
const controller = require('../controllers/usermanual');

router.get('/', controller.view);

module.exports = router;
