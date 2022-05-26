const { models } = require("../../config/DBconnect");
const { QueryTypes } = require("sequelize");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const listUsermanual = () => {
    return models.usermanual.findAll({
        where: { isDeleted: false },

        order: [
            ['id', 'ASC'],
        ],
    });
};
const addUsermanual = async(usermanual) => {
    try {
        await models.usermanual.create({
            description: usermanual.description,

        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const updateUsermanual = async(usermanual) => {
    try {
        await models.usermanual.update({
            description: usermanual.description,

        }, {
            where: {
                id: usermanual.id
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};


const deleteUsermanual = async(id) => {


    try {
        await models.usermanual.update({
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
    listUsermanual,
    addUsermanual,
    updateUsermanual,
    deleteUsermanual
};