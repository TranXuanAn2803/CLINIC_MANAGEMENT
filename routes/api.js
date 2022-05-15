const router = require('express').Router();
const faker = require('@faker-js/faker/locale/vi');

router.get('/data', (_, res) => {
  const data = [];
  const addr = faker.address;
  for (let i = 0; i < 40; ++i) {
    data.push({
      id: i,
      name: faker.name.lastName() + ' ' + faker.name.firstName(),
      gender: faker.name.gender(),
      yearOfBirth: faker.date.between('1960-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z').getFullYear(),
      address: `${addr.secondaryAddress()}, ${addr.streetAddress()}, ${addr.city()}`
    });
  }
  res.send(data);
});

module.exports = router;
