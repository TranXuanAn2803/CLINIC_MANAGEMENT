const { models } = require('../../config/DBconnect');

const listDisease = () => models.disease.findAll({
    where: { isDeleted: false },
    order: [
        ['id', 'ASC']
    ]
});

const addDisease = async({ description }) => { await models.disease.create({ description }); };

const updateDisease = async({ description, id }) => {
    await models.disease.update({ description }, { where: { id } });
};

const deleteDisease = async(id) => {
    await models.disease.update({ isDeleted: true }, { where: { id } });
};

module.exports = {
    listDisease,
    addDisease,
    updateDisease,
    deleteDisease
};