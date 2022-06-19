const router = require('express').Router();
const controller = require('../controllers/unit');

router.get('/', (req, res) => {
  if (req.session.user !== undefined) {
    controller.view(req, res);
  } else {
    res.redirect('/user/login');
  }
});
router.post('/add', controller.addUnit);
router.post('/edit', controller.editUnit);
router.post('/delete', controller.deleteUnit);

module.exports = router;
