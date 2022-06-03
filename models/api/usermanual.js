const { models } = require('../../config/DBconnect');

const listUsermanual = () => models.usermanual.findAll({ where: { isDeleted: false }, order: [['id', 'ASC']] });

const addUsermanual = async ({ description }) => {
  try {
    await models.usermanual.create({ description });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

const updateUsermanual = async ({ id, description }) => {
  try {
    await models.usermanual.update({ description }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

const deleteUsermanual = async (id) => {
  try {
    await models.usermanual.update({ isDeleted: true }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

module.exports = {
  listUsermanual,
  addUsermanual,
  updateUsermanual,
  deleteUsermanual
};
