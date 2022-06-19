const router = require('express').Router();
const controller = require('../controllers/patient');

router.get('/', (req, res) => {
  if (req.session.user !== undefined) {
    controller.view(req, res);
  } else {
    res.redirect('/user/login');
  }
});
router.post('/add', controller.addPatient);
router.post('/edit', controller.editPatient);
router.post('/delete', controller.deletePatient);

module.exports = router;
