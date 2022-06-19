const router = require('express').Router();
const controller = require('../controllers/constraint');

router.get('/', controller.view);
router.get("/add", controller.editMaxPatient)
module.exports = router;