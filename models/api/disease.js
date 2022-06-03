const { models } = require('../../config/DBconnect');

const listDisease = () => models.disease.findAll({
  where: { isDeleted: false },
  order: [['id', 'ASC']]
});

const addDisease = async ({ desciption }) => {
  try {
    await models.disease.create({ desciption });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};
const updateDisease = async ({ desciption, id }) => {
  try {
    await models.disease.update({ desciption }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

const deleteDisease = async (id) => {
  try {
    await models.disease.update({ isDeleted: true }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

module.exports = {
  listDisease,
  addDisease,
  updateDisease,
  deleteDisease
};
