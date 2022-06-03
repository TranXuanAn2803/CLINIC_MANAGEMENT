const apiCheckup = require('../models/api/checkup');
const apiConstraint = require('../models/api/constraint');
const moment = require('moment');

const view = (_, res) => {
  res.render('checkup', { title: 'Phiếu khám' });
};

const viewlist = async (req, res) => {
  const checkup = await apiCheckup.listCheckUp2();
  for (const c of checkup) {
    let stringDisease = '';
    let stringMedicine = '';
    const disease = await apiCheckup.findDisease(c.id);
    const medicine = await apiCheckup.findMedicine(c.id);

    for (const d of disease) {
      stringDisease = stringDisease + (d.iddisease_disease.desciption) + ' ';
    }
    c.disease = stringDisease;
    for (const m of medicine) {
      stringMedicine = stringMedicine + (m.medicine_medicine.name) + ' ';
    }
    c.medicine = stringMedicine;
  }
  console.log(checkup);
};
const viewListPatientOfDate = async (req, res) => {
  const date = moment('2022-1-17', 'YYYY-MM-DD');
  const p = await apiCheckup.listPatientOfDate(date);
  console.log(p);
};
const viewCheckUp = async (req, res) => {
  const id = 11;
  const checkup = await apiCheckup.findCheckUp(id);
  let stringDisease = '';
  const disease = await apiCheckup.findDisease(id);
  const medicine = await apiCheckup.findMedicine(id);

  for (const d of disease) {
    stringDisease = stringDisease + (d.iddisease_disease.desciption) + ' ';
  }
  checkup.disease = stringDisease;

  console.log(checkup, medicine);
};

const addCheckup = async (req, res) => {
  const checkup = {
    patient: 4,
    date: '2022-1-31'
  };
  let maxPatient = await apiConstraint.maxPatient();
  maxPatient = parseInt(maxPatient.maxPatient);

  const date = moment(checkup.date, 'YYYY-MM-DD');
  let count = await apiCheckup.countPatientOfDate(date);
  count = count[0];
  console.log(count.count, maxPatient);
  if (parseInt(count.count) < maxPatient) {
    try {
      await apiCheckup.addCheckup(checkup);
    } catch (err) {
      return false;
    }
    const p = await apiCheckup.listCheckUp();
    console.log(p);
    return true;
  } else {
    console.log('patient is too much');
  }
};
const addDisease = async (req, res) => {
  const checkupDisease = {
    idcheckup: 8,
    iddisease: 3
  };

  try {
    await apiCheckup.addDisease(checkupDisease);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listCheckUp();
  console.log(p);
  return true;
};
const editDisease = async (req, res) => {
  const checkupDisease = {
    idcheckup: 8,
    olddisease: 3,
    newdisease: 6
  };

  try {
    await apiCheckup.updateDisease(checkupDisease);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listCheckUp();
  console.log(p);
  return true;
};
const deleteDisease = async (req, res) => {
  const idcheckup = 8;
  const iddisease = 6;
  try {
    await apiCheckup.deleteDisease(idcheckup, iddisease);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listCheckUp();
  console.log(p);
  return true;
};
const addMedicine = async (req, res) => {
  const checkupMedicine = {
    checkup: 11,
    medicine: 3,
    number: 10
  };

  try {
    await apiCheckup.addMedicine(checkupMedicine);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listCheckUp();
  console.log(p);
  return true;
};
const editMedicine = async (req, res) => {
  const checkupMedicine = {
    checkup: 11,
    newmedicine: 6,
    oldmedicine: 3,
    number: 5
  };

  try {
    await apiCheckup.updateMedicine(checkupMedicine);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listCheckUp();
  console.log(p);
  return true;
};
const deleteMedicine = async (req, res) => {
  const checkup = 11;
  const medicine = 6;
  try {
    await apiCheckup.deleteMedicine(checkup, medicine);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listCheckUp();
  console.log(p);
  return true;
};
const editCheckup = async (req, res) => {
  const checkup = {
    id: 1,
    patient: 2,
    symptoms: 'ho, dau hong',
    date: '2022-01-31'
  };

  try {
    await apiCheckup.updateCheckup(checkup);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listCheckUp();
  console.log(p);
  return true;
};
const deleteCheckUp = async (req, res) => {
  const id = 9;
  try {
    await apiCheckup.deleteCheckUp(id);
  } catch (err) {
    return false;
  }
  try {
    await apiCheckup.deleteCheckUp_Disease(id);
  } catch (err) {
    return false;
  }
  try {
    await apiCheckup.deleteCheckUp_Medicine(id);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listCheckUp();
  console.log(p);
  return true;
};
const exportBill = async (req, res) => {
  const id = 11;
  let medicinefee = 0;
  const medicine = await apiCheckup.findMedicine(id);

  for (const m of medicine) {
    medicinefee = medicinefee + parseInt(m.number) * parseInt(m.medicine_medicine.price);
  }
  const bill = {
    checkup: id,
    examinationFee: medicinefee + 50,
    medicineFee: medicinefee
  };
  try {
    await apiCheckup.addBill(bill);
  } catch (err) {
    return false;
  }
  const p = await apiCheckup.listBill();
  console.log(p);
  return true;
};
const saleReport = async (req, res) => {
  const date = moment('2022-1', 'YYYY-MM');
  const month = parseInt(date.format('MM'));
  const year = parseInt(date.format('YYYY'));

  const p = await apiCheckup.saleReport(month, year);
  console.log(p);
  return true;
};
const medicineReport = async (req, res) => {
  const date = moment('2022-1', 'YYYY-MM');
  const month = parseInt(date.format('MM'));
  const year = parseInt(date.format('YYYY'));

  const p = await apiCheckup.medicineReport(month, year);
  console.log(p);
  return true;
};
const getConst = async (req, res) => {
  const username = await apiConstraint.username();
  const password = await apiConstraint.password();
  const examinationFee = await apiConstraint.examinationFee();
  const maxPatient = await apiConstraint.maxPatient();
  console.log(username, password, examinationFee, maxPatient);
  return true;
};

module.exports = {
  view,
  addCheckup,
  editCheckup,
  deleteCheckUp,
  addDisease,
  viewlist,
  editDisease,
  deleteDisease,
  addMedicine,
  editMedicine,
  deleteMedicine,
  exportBill,
  saleReport,
  medicineReport,
  getConst,
  viewListPatientOfDate,
  viewCheckUp
};
