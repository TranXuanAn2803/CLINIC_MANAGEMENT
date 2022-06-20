const apiConstraint = require('../models/api/constraint');

const view = async (_, res) => {
  const name = await apiConstraint.username;
  const password = await apiConstraint.password;
  const maxPatient = await apiConstraint.maxPatient;
  const examinationFee = await apiConstraint.examinationFee;

  res.render('constraint', {
    title: 'Quy định',
    username: name.username,
    password: password.password,
    maxPatient: maxPatient.maxPatient,
    examinationFee: examinationFee.examinationFee
  });
};

const editConstraint = async (req, res) => {
  const newConstraint = req.body;
  const name = await apiConstraint.username;
  try {
    await apiConstraint.updateConstraint(newConstraint, name.username);
  } catch (err) {
    console.log(err);
  }
  const password = await apiConstraint.password;
  const maxPatient = await apiConstraint.maxPatient;
  const examinationFee = await apiConstraint.examinationFee;
  console.log(password.password, maxPatient.maxPatient, examinationFee.examinationFee);
};

module.exports = { view, editConstraint };
