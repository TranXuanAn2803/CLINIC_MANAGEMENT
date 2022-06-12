const viewRevenue = (_, res) => {
  res.render('report-revenue', { title: 'Doanh Thu' });
};

const viewMedicine = (_, res) => {
  res.render('report-medicine', { title: 'Tổng Số Thuốc' });
};

module.exports = {
  viewRevenue,
  viewMedicine
};
