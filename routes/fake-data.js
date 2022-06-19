const router = require('express').Router();
const controllerPatient = require('../controllers/patient');
const controllerMedicine = require('../controllers/medicine');
const controllerDisease = require('../controllers/disease');
const controllerUnit = require('../controllers/unit');
const controllerUsermanual = require('../controllers/usermanual');

router.get('/patient', async (_, res) => {
  const patient = await controllerPatient.listPatient();
  res.send(patient);
});

router.get('/medicine', async (_, res) => {
  const medicine = await controllerMedicine.listMedicine();
  res.send(medicine);
});

router.get('/disease', async (_, res) => {
  const disease = await controllerDisease.listDisease();
  res.send(disease);
});

router.get('/unit', async (_, res) => {
  const unit = await controllerUnit.listDisease();
  res.send(unit);
});

router.get('/usermanual', async (_, res) => {
  const usermanual = await controllerUsermanual.listUsermanual();
  res.send(usermanual);
});

module.exports = router;
