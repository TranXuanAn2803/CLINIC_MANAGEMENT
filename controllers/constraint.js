const view = (_, res) => {
  res.render('constraint', {
    title: 'Quy định',
    username: 'username',
    password: 'password',
    maxPatient: 40,
    examinationFee: 40000
  });
};

module.exports = { view };
