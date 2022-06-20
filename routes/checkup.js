const router = require('express').Router();
const controller = require('../controllers/checkup');

router.get('/', (req, res) => {
    if (req.session.user != undefined) {
        controller.view(req, res)

    } else {
        res.redirect('/user/login')
    }

});

router.post('/add', controller.addCheckup);

router.post('/delete', controller.deleteCheckUp);

router.get('/edit/:id', (req, res) => {
    if (req.session.user != undefined) {
        controller.viewEditCheckup(req, res)

    } else {
        res.redirect('/user/login')
    }

});
router.post('/checkupMedicine/add', controller.addMedicine);
router.post('/checkupMedicine/edit', controller.editMedicine);
router.post('/checkupMedicine/delete', controller.deleteMedicine);

router.post('/checkupDisease/add', controller.addDisease);
router.post('/checkupDisease/edit', controller.editDisease);
router.post('/checkupDisease/delete', controller.deleteDisease);



router.get('/bill/:id', (req, res) => {
    if (req.session.user != undefined) {
        controller.exportBill(req, res)

    } else {
        res.redirect('/user/login')
    }

});

module.exports = router;