const router = require('express').Router();

router.get('/', (_, res) => {
  res.render('disease', { title: 'Bệnh' });
});

module.exports = router;
