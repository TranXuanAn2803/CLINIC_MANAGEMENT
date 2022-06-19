const router = require('express').Router();
const controller = require('../controllers/disease');

router.get('/', controller.view);

module.exports = router;
