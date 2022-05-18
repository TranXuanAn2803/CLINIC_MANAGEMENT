const router = require('express').Router();
const faker = require('@faker-js/faker/locale/vi');

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
  return data;
};

router.get('/patient', (_, res) => {
  res.send(generateFakeData(40, patientGenerator));
});

router.get('/medicine', (_, res) => {
  res.send(generateFakeData(50, medicineGenerator));
});

router.get('/disease', (_, res) => {
  res.send(generateFakeData(50, id => ({ id, description: random.words() })));
});

router.get('/unit', (_, res) => {
  res.send(UNITS);
});

router.get('/user-manual', (_, res) => {
  res.send(USER_MANUALS);
});

module.exports = router;