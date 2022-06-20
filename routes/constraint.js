const router = require('express').Router();
const controller = require('../controllers/constraint');

router.get('/', (req, res) => {
  if (req.session.user !== undefined) {
    controller.view(req, res);
  } else {
    res.redirect('/user/login');
  }
});
router.post('/edit', controller.editConstraint);

module.exports = router;
