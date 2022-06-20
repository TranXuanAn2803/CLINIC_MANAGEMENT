const router = require('express').Router();
const controllerPatient = require('../controllers/patient');
const controllerMedicine = require('../controllers/medicine');
const controllerDisease = require('../controllers/disease');
const controllerUnit = require('../controllers/unit');
const controllerUsermanual = require('../controllers/usermanual');
const controllerCheckup = require('../controllers/checkup');

const faker = require('@faker-js/faker/locale/vi');
const async = require('hbs/lib/async');

const random = faker.random;
const addr = faker.address;

const UNITS = ['Viên', 'Liều', 'cc'];
const USER_MANUALS = ['Cách dùng 1', 'Cách dùng 2', 'Cách dùng 3', 'Cách dùng 4'];

const randInt = (l, r) => Math.floor(Math.random() * (r - l) + l);

const patientGenerator = id => ({
    id,
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    gender: faker.name.gender(),
    yearOfBirth: faker.date.between('1960-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z').getFullYear(),
    address: `${addr.secondaryAddress()}, ${addr.streetAddress()}, ${addr.city()}`
});

const medicineGenerator = id => ({
    id,
    name: random.word(),
    unit: UNITS[randInt(0, UNITS.length)],
    userManual: USER_MANUALS[randInt(0, USER_MANUALS.length)],
    price: parseInt(random.numeric(2) + '000')
});

const diseaseGenerator = id => ({

});

const checkupGenerator = id => ({
    id,
    patient: patientGenerator(id),
    symptoms: faker.lorem(),
});

const generateFakeData = (n, generator) => {
    const data = [];
    for (let i = 0; i < 40; ++i) {
        data.push(generator(i));
    }
    console.log(data)
    return data;
};


router.get('/patient', async(_, res) => {
    const patient = await controllerPatient.listPatient()
    res.send(patient);
});

router.get('/medicine', async(_, res) => {
    const medicine = await controllerMedicine.listMedicine()
    res.send(medicine);
});

router.get('/disease', async(_, res) => {
    const disease = await controllerDisease.listDisease()
    res.send(disease);
});

router.get('/unit', async(_, res) => {
    const unit = await controllerUnit.listUnit()
    res.send(unit);
});

router.get('/usermanual', async(_, res) => {
    const usermanual = await controllerUsermanual.listUsermanual()
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