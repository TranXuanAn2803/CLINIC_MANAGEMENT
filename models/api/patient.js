const { models } = require('../../config/DBconnect');
const { Op } = require('sequelize');

const listPatient = () => models.patient.findAll({ order: [['id', 'ASC']] });

const findPatient = (startdate, enddate) => {
  return models.patient.findAll({
    order: [['id', 'ASC']],
    include: [{
      model: models.checkup,
      required: true,
      as: 'checkups',
      where: { date: { [Op.gte]: startdate, [Op.lte]: enddate } }
    }],
    raw: true,
    nest: true
  });
};

const addPatient = async ({ name, gender, yearOfBirth, address }) => {
  try {
    await models.patient.create({ name, gender, yearOfBirth, address });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

const updatePatient = async ({ id, name, gender, yearOfBirth, address }) => {
  try {
    await models.patient.update({ name, gender, yearOfBirth, address }, { where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

const deletePatient = async (id) => {
  try {
    await models.patient.destroy({ where: { id } });
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
};

module.exports = {
  listPatient,
  addPatient,
  updatePatient,
  deletePatient,
  findPatient
};
