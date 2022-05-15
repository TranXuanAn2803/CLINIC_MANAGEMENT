const view = (_, res) => {
  res.render('patient', { title: 'Xem bệnh nhân' });
};

module.exports = {
  view
};
