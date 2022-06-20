const { models } = require('../../config/DBconnect');

const findConstraint = att => models.constraint.findOne({ attributes: [att] });

const username = findConstraint('username');

const password = findConstraint('password');

const maxPatient = findConstraint('maxPatient');

const examinationFee = findConstraint('examinationFee');
const updateConstraint = async (newConstraint, user) => {
  await models.constraint.update({
    username: newConstraint.username,
    password: newConstraint.password,
    maxPatient: newConstraint.maxPatient,
    examinationFee: newConstraint.examinationFee
  }, { where: { username: user } });
};

module.exports = {
  username,
  password,
  maxPatient,
  examinationFee,
  updateConstraint
};
