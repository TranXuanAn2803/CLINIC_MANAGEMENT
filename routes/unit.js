const router = require('express').Router();
const controller = require('../controllers/unit');

router.get('/', controller.view);

module.exports = router;
