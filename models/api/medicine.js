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
  await models.medicine.create({ name, unit, usermanual, price });
};

const updateMedicine = async ({ id, name, unit, usermanual, price }) => {
  await models.medicine.update({ name, unit, usermanual, price }, { where: { id } });
};

const deleteMedicine = async id => { await models.medicine.update({ isDeleted: true }, { where: { id } }); };

module.exports = {
  listMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine
};
