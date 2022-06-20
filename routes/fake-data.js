const router = require('express').Router();
const controllerPatient = require('../controllers/patient');
const controllerMedicine = require('../controllers/medicine');
const controllerDisease = require('../controllers/disease');
const controllerUsermanual = require('../controllers/usermanual');
const apiCheckup = require('../models/api/checkup');

router.get('/checkup', async (_, res) => {
  const checkups = await apiCheckup.listCheckUp();
  res.send(checkups);
});

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
  const unit = await controllerDisease.listDisease();
  res.send(unit);
});

router.get('/usermanual', async (_, res) => {
  const usermanual = await controllerUsermanual.listUsermanual();
  res.send(usermanual);
});

module.exports = router;
