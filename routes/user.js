const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/login', controller.view);

router.post('/login', (req, res) => {
  res.send(req.body);
});

module.exports = router;
