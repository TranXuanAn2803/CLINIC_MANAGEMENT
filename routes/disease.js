const router = require('express').Router();
const controller = require('../controllers/disease');

router.get('/', (req, res) => {
  if (req.session.user !== undefined) {
    controller.view(req, res);
  } else {
    res.redirect('/user/login');
  }
});
router.post('/add', controller.addDisease);
router.post('/edit', controller.editDisease);
router.post('/delete', controller.deleteDisease);

module.exports = router;
