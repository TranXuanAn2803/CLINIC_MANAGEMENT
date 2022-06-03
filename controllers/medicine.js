const apiMedicine = require('../models/api/medicine');
const UNITS = ['Viên', 'Liều', 'cc'];
const USER_MANUALS = ['Cách dùng 1', 'Cách dùng 2', 'Cách dùng 3', 'Cách dùng 4'];

const view = (_, res) => {
  res.render('medicine', { title: 'Thuốc', units: UNITS, userManuals: USER_MANUALS });
};

const addMedicine = async (req, res) => {
  const medicine = {
    name: 'panadol',
    unit: '2',
    usermanual: '2',
    price: 50
  };
  try {
    await apiMedicine.addMedicine(medicine);
  } catch (err) {
    return false;
  }
  // const p = await apiMedicine.listMedicine();
  // console.log(p);
  return true;
};
const editMedicine = async (req, res) => {
  const medicine = {
    id: 1,
    name: 'panadol extra',
    unit: 2,
    usermanual: 3,
    price: 60
  };

  try {
    await apiMedicine.updateMedicine(medicine);
  } catch (err) {
    return false;
  }
  const p = await apiMedicine.listMedicine();
  console.log(p);
  return true;
};
const deleteMedicine = async (req, res) => {
  const id = 1;
  try {
    await apiMedicine.deleteMedicine(id);
  } catch (err) {
    return false;
  }
  const p = await apiMedicine.listMedicine();
  console.log(p);
  return true;
};
module.exports = {
  view,
  addMedicine,
  editMedicine,
  deleteMedicine
};
