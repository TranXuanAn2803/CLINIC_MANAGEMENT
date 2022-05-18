const router = require('express').Router();

const UNITS = ['Viên', 'Liều', 'cc'];
const USER_MANUALS = ['Cách dùng 1', 'Cách dùng 2', 'Cách dùng 3', 'Cách dùng 4'];

router.get('/', (_, res) => {
  res.render('medicine', { title: 'Thuốc', units: UNITS, userManuals: USER_MANUALS });
});

module.exports = router;
