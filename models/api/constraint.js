const { models } = require('../../config/DBconnect');

const findConstraint = att => models.constraint.findOne({ attributes: [att] });

const username = findConstraint('username');

const password = findConstraint('password');

const maxPatient = findConstraint('maxPatient');

const examinationFee = findConstraint('examinationFee');

module.exports = {
  username,
  password,
  maxPatient,
  examinationFee
};
