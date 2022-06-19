const { models } = require('../../config/DBconnect');
const { Op } = require('sequelize');

const listPatient = () => models.patient.findAll({
  order: [
    ['id', 'ASC']
  ]
});

const findPatient = (startdate, enddate) =>
  models.patient.findAll({
    order: [
      ['id', 'ASC']
    ],
    include: [{
      model: models.checkup,
      required: true,
      as: 'checkups',
      where: {
        date: { [Op.gte]: startdate, [Op.lte]: enddate }
      }
    }],
    raw: true,
    nest: true
  });

const addPatient = async ({ name, gender, yearOfBirth, address }) => {
  return await models.patient.create({ name, gender, yearOfBirth, address });
};

const updatePatient = async ({ id, name, gender, yearOfBirth, address }) => {
  await models.patient.update({ name, gender, yearOfBirth, address }, { where: { id } });
};

const deletePatient = async (id) => { await models.patient.destroy({ where: { id } }); };

module.exports = {
  listPatient,
  addPatient,
  updatePatient,
  deletePatient,
  findPatient
};
