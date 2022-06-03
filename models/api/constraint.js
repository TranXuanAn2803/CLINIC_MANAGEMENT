const { models } = require('../../config/DBconnect');

// TODO: maybe change from find all to find one ???

const username = async () => {
  const u = await models.constraint.findAll({ attributes: ['username'] });
  return u[0];
};

const password = async () => {
  const p = await models.constraint.findAll({
    attributes: ['password']

  });
  return p[0];
};
const maxPatient = async () => {
  const m = await models.constraint.findAll({
    attributes: ['maxPatient']

  });
  return m[0];
};

const examinationFee = async () => {
  const e = await models.constraint.findAll({
    attributes: ['examinationFee']

  });
  return e[0];
};
module.exports = {
  username,
  password,
  maxPatient,
  examinationFee
};
