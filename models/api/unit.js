const { models } = require('../../config/DBconnect');

const listUnit = () => models.unit.findAll({
  where: { isDeleted: false },
  order: [
    ['id', 'ASC']
  ]
});

const addUnit = async ({ type }) => { await models.unit.create({ type }); };

const updateUnit = async ({ id, type }) => { await models.unit.update({ type }, { where: { id } }); };

const deleteUnit = async (id) => { await models.unit.update({ isDeleted: true }, { where: { id } }); };

module.exports = {
  listUnit,
  addUnit,
  updateUnit,
  deleteUnit
};
