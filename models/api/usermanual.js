const { models } = require('../../config/DBconnect');

const listUsermanual = () => models.usermanual.findAll({ where: { isDeleted: false }, order: [['id', 'ASC']] });

const addUsermanual = async ({ description }) => { await models.usermanual.create({ description }); };

const updateUsermanual = async ({ id, description }) => {
  await models.usermanual.update({ description }, { where: { id } });
};

const deleteUsermanual = async id => {
  await models.usermanual.update({ isDeleted: true }, { where: { id } });
};

module.exports = {
  listUsermanual,
  addUsermanual,
  updateUsermanual,
  deleteUsermanual
};
