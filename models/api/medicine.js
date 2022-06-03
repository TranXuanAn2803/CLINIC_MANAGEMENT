const { models } = require('../../config/DBconnect');

const listMedicine = () => {
  return models.medicine.findAll({
    where: { isDeleted: false },
    order: [['id', 'ASC']],
    include: [
      {
        model: models.unit,
        required: false,
        as: 'unit_unit'
      },
      {
        model: models.usermanual,
        required: false,
        as: 'usermanual_usermanual'
      }
    ],
    raw: true,
    nest: true
  });
};

const addMedicine = async ({ name, unit, usermanual, price }) => {
  try {
    await models.medicine.create({ name, unit, usermanual, price });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

const updateMedicine = async ({ id, name, unit, usermanual, price }) => {
  try {
    await models.medicine.update({ name, unit, usermanual, price }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

const deleteMedicine = async (id) => {
  try {
    await models.medicine.update({ isDeleted: true }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

module.exports = {
  listMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine
};
