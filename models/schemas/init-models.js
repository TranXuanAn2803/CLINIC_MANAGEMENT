const DataTypes = require('sequelize').DataTypes;
const _bill = require('./bill');
const _checkup = require('./checkup');
const _checkupDisease = require('./checkup-disease');
const _checkupMedicine = require('./checkup-medicine');
const _constraint = require('./constraint');
const _disease = require('./disease');
const _medicine = require('./medicine');
const _patient = require('./patient');
const _unit = require('./unit');
const _usermanual = require('./usermanual');

function initModels(sequelize) {
  const bill = _bill(sequelize, DataTypes);
  const checkup = _checkup(sequelize, DataTypes);
  const checkupDisease = _checkupDisease(sequelize, DataTypes);
  const checkupMedicine = _checkupMedicine(sequelize, DataTypes);
  const constraint = _constraint(sequelize, DataTypes);
  const disease = _disease(sequelize, DataTypes);
  const medicine = _medicine(sequelize, DataTypes);
  const patient = _patient(sequelize, DataTypes);
  const unit = _unit(sequelize, DataTypes);
  const usermanual = _usermanual(sequelize, DataTypes);

  checkup.belongsToMany(disease, { as: 'iddisease_diseases', through: checkup - disease, foreignKey: 'idcheckup', otherKey: 'iddisease' });
  checkup.belongsToMany(medicine, { as: 'medicine_medicines', through: checkup - medicine, foreignKey: 'checkup', otherKey: 'medicine' });
  disease.belongsToMany(checkup, { as: 'idcheckup_checkups', through: checkup - disease, foreignKey: 'iddisease', otherKey: 'idcheckup' });
  medicine.belongsToMany(checkup, { as: 'checkup_checkups', through: checkup - medicine, foreignKey: 'medicine', otherKey: 'checkup' });
  bill.belongsTo(checkup, { as: 'checkup_checkup', foreignKey: 'checkup' });
  checkup.hasOne(bill, { as: 'bill', foreignKey: 'checkup' });
  checkupDisease.belongsTo(checkup, { as: 'idcheckup_checkup', foreignKey: 'idcheckup' });
  checkup.hasMany(checkup - disease, { as: 'checkup-diseases', foreignKey: 'idcheckup' });
  checkupMedicine.belongsTo(checkup, { as: 'checkup_checkup', foreignKey: 'checkup' });
  checkup.hasMany(checkup - medicine, { as: 'checkup-medicines', foreignKey: 'checkup' });
  checkupDisease.belongsTo(disease, { as: 'iddisease_disease', foreignKey: 'iddisease' });
  disease.hasMany(checkup - disease, { as: 'checkup-diseases', foreignKey: 'iddisease' });
  checkupMedicine.belongsTo(medicine, { as: 'medicine_medicine', foreignKey: 'medicine' });
  medicine.hasMany(checkup - medicine, { as: 'checkup-medicines', foreignKey: 'medicine' });
  checkup.belongsTo(patient, { as: 'patient_patient', foreignKey: 'patient' });
  patient.hasMany(checkup, { as: 'checkups', foreignKey: 'patient' });
  medicine.belongsTo(unit, { as: 'unit_unit', foreignKey: 'unit' });
  unit.hasMany(medicine, { as: 'medicines', foreignKey: 'unit' });
  medicine.belongsTo(usermanual, { as: 'usermanual_usermanual', foreignKey: 'usermanual' });
  usermanual.hasMany(medicine, { as: 'medicines', foreignKey: 'usermanual' });

  return {
    bill,
    checkup,
    checkup_disease: checkupDisease,
    checkup_medicine: checkupMedicine,
    constraint,
    disease,
    medicine,
    patient,
    unit,
    usermanual
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
