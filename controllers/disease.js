const apiDisease = require('../models/api/disease');

const view = (_, res) => {
  res.render('disease', { title: 'Bệnh' });
};
const listDisease = async (req, res) => {
  const disease = await apiDisease.listDisease();

  return disease;
};
const addDisease = async (req, res) => {
  const disease = req.body;
  try {
    await apiDisease.addDisease(disease);
  } catch (err) {
    console.log(err);
  }
};
const editDisease = async (req, res) => {
  const disease = req.body;
  try {
    await apiDisease.updateDisease(disease);
  } catch (err) {
    console.log(err);
  }
};
const deleteDisease = async (req, res) => {
  const disease = req.body;
  for (const d of disease) {
    console.log(d);
    try {
      await apiDisease.deleteDisease(d.id);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = {
  view,
  addDisease,
  editDisease,
  deleteDisease,
  listDisease
};
