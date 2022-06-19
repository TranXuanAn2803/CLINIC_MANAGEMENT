const router = require('express').Router();
const controller = require('../controllers/medicine');

router.get('/', controller.view);

module.exports = router;
