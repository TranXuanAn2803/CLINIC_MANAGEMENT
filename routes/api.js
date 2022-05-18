const router = require('express').Router();
const fakeDataRouter = require('./fake-data');

router.use('/fake', fakeDataRouter);

module.exports = router;
