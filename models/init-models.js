var DataTypes = require("sequelize").DataTypes;
var _bill = require("./bill");
var _checkup = require("./checkup");
var _checkup-disease = require("./checkup-disease");
var _checkup-medicine = require("./checkup-medicine");
var _constraint = require("./constraint");
var _disease = require("./disease");
var _medicine = require("./medicine");
var _patient = require("./patient");
var _unit = require("./unit");
var _usermanual = require("./usermanual");

function initModels(sequelize) {
  var bill = _bill(sequelize, DataTypes);
  var checkup = _checkup(sequelize, DataTypes);
  var checkup-disease = _checkup-disease(sequelize, DataTypes);
  var checkup-medicine = _checkup-medicine(sequelize, DataTypes);
  var constraint = _constraint(sequelize, DataTypes);
  var disease = _disease(sequelize, DataTypes);
  var medicine = _medicine(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var unit = _unit(sequelize, DataTypes);
  var usermanual = _usermanual(sequelize, DataTypes);

  checkup.belongsToMany(disease, { as: 'iddisease_diseases', through: checkup-disease, foreignKey: "idcheckup", otherKey: "iddisease" });
  checkup.belongsToMany(medicine, { as: 'medicine_medicines', through: checkup-medicine, foreignKey: "checkup", otherKey: "medicine" });
  disease.belongsToMany(checkup, { as: 'idcheckup_checkups', through: checkup-disease, foreignKey: "iddisease", otherKey: "idcheckup" });
  medicine.belongsToMany(checkup, { as: 'checkup_checkups', through: checkup-medicine, foreignKey: "medicine", otherKey: "checkup" });
  bill.belongsTo(checkup, { as: "checkup_checkup", foreignKey: "checkup"});
  checkup.hasOne(bill, { as: "bill", foreignKey: "checkup"});
  checkup-disease.belongsTo(checkup, { as: "idcheckup_checkup", foreignKey: "idcheckup"});
  checkup.hasMany(checkup-disease, { as: "checkup-diseases", foreignKey: "idcheckup"});
  checkup-medicine.belongsTo(checkup, { as: "checkup_checkup", foreignKey: "checkup"});
  checkup.hasMany(checkup-medicine, { as: "checkup-medicines", foreignKey: "checkup"});
  checkup-disease.belongsTo(disease, { as: "iddisease_disease", foreignKey: "iddisease"});
  disease.hasMany(checkup-disease, { as: "checkup-diseases", foreignKey: "iddisease"});
  checkup-medicine.belongsTo(medicine, { as: "medicine_medicine", foreignKey: "medicine"});
  medicine.hasMany(checkup-medicine, { as: "checkup-medicines", foreignKey: "medicine"});
  checkup.belongsTo(patient, { as: "patient_patient", foreignKey: "patient"});
  patient.hasMany(checkup, { as: "checkups", foreignKey: "patient"});
  medicine.belongsTo(unit, { as: "unit_unit", foreignKey: "unit"});
  unit.hasMany(medicine, { as: "medicines", foreignKey: "unit"});
  medicine.belongsTo(usermanual, { as: "usermanual_usermanual", foreignKey: "usermanual"});
  usermanual.hasMany(medicine, { as: "medicines", foreignKey: "usermanual"});

  return {
    bill,
    checkup,
    checkup-disease,
    checkup-medicine,
    constraint,
    disease,
    medicine,
    patient,
    unit,
    usermanual,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
