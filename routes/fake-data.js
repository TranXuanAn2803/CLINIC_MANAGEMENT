const router = require('express').Router();
const controllerPatient = require('../controllers/patient');
const controllerMedicine = require('../controllers/medicine');
const controllerDisease = require('../controllers/disease');
const controllerUsermanual = require('../controllers/usermanual');
const controllerCheckup = require('../controllers/checkup');
const controllerUnit = require('../controllers/unit');

router.get('/checkup', async(_, res) => {
    const checkups = await controllerCheckup.viewlist();
    res.send(checkups);
});
router.get('/checkupMedicine/:id', async(req, res) => {
    const id = req.params
    const medicine = await controllerCheckup.viewMedicine(id);
    res.send(medicine);
});
router.get('/checkupDisease/:id', async(req, res) => {
    const id = req.params
    const disease = await controllerCheckup.viewDisease(id);
    res.send(disease);
});
router.get('/checkup-find/:month', async(req, res) => {
    const month = req.params
    const checkup = await controllerCheckup.viewlistOfMonth(month);
    res.send(checkup);
});
router.get('/patient', async(_, res) => {
    const patient = await controllerPatient.listPatient();
    res.send(patient);
});

router.get('/medicine', async(_, res) => {
    const medicine = await controllerMedicine.listMedicine();
    res.send(medicine);
});

router.get('/disease', async(_, res) => {
    const disease = await controllerDisease.listDisease();
    res.send(disease);
});

router.get('/unit', async(_, res) => {
    const unit = await controllerUnit.listUnit();
    res.send(unit);
});

router.get('/usermanual', async(_, res) => {
    const usermanual = await controllerUsermanual.listUsermanual();
    res.send(usermanual);
});
router.get('/reportMedicine/:month', async(req, res) => {
    const month = req.params
    const report = await controllerCheckup.medicineReport(month)
    res.send(report)
});
router.get('/reportRevenue/:month', async(req, res) => {
    const month = req.params
    const report = await controllerCheckup.saleReport(month)
    res.send(report)
});
module.exports = router;