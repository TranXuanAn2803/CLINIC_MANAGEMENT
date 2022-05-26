const { models } = require("../../config/DBconnect");
const { QueryTypes } = require("sequelize");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const listDisease = () => {
    return models.disease.findAll({
        where: { isDeleted: false },

        order: [
            ['id', 'ASC'],
        ],
    });
};
const addDisease = async(disease) => {
    try {
        await models.disease.create({
            desciption: disease.desciption,

        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const updateDisease = async(disease) => {
    try {
        await models.disease.update({
            desciption: disease.desciption,

        }, {
            where: {
                id: disease.id
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};

const deleteDisease = async(id) => {


    try {
        await models.disease.update({
            isDeleted: true,
        }, {
            where: {
                id: id
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
module.exports = {
    listDisease,
    addDisease,
    updateDisease,
    deleteDisease
};