const router = require('express').Router();
const faker = require('@faker-js/faker/locale/vi');

const generateFakeData = (n, generator) => {
  const data = [];
  for (let i = 0; i < 40; ++i) {
    data.push(generator(i));
  }
  return data;
};

router.get('/patient', (_, res) => {
  const addr = faker.address;
  const generator = id => ({
    id,
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    gender: faker.name.gender(),
    yearOfBirth: faker.date.between('1960-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z').getFullYear(),
    address: `${addr.secondaryAddress()}, ${addr.streetAddress()}, ${addr.city()}`
  });
  res.send(generateFakeData(40, generator));
});

router.get('/disease', (_, res) => {
  res.send(generateFakeData(50, id => ({ id, description: faker.random.words() })));
});

module.exports = router;
