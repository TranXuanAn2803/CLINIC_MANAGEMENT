const viewRevenue = (_, res) => {
  res.render('report-revenue', { title: 'Doanh Thu' });
};

module.exports = {
  viewRevenue
};
