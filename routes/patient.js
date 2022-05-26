const router = require('express').Router();
const controller = require('../controllers/patient');
const patient = require('../controllers/patient');

router.get('/', controller.view);
router.get('/add', patient.findPatient);


module.exports = router;