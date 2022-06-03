const { models } = require('../../config/DBconnect');

const listUnit = () => models.usermanual.findAll({ where: { isDeleted: false }, order: [['id', 'ASC']] });

const addUnit = async ({ type }) => {
  try {
    await models.unit.create({ type });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};
const updateUnit = async ({ id, type }) => {
  try {
    await models.unit.update({ type }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

const deleteUnit = async (id) => {
  try {
    await models.unit.update({ isDeleted: true }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};
module.exports = {
  listUnit,
  addUnit,
  updateUnit,
  deleteUnit
};
