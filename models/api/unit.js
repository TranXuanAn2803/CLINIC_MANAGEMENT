const { models } = require("../../config/DBconnect");
const { QueryTypes } = require("sequelize");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const listUnit = () => {
    return models.usermanual.findAll({
        where: { isDeleted: false },

        order: [
            ['id', 'ASC'],
        ],
    });
};
const addUnit = async(unit) => {
    try {
        await models.unit.create({
            type: unit.type,

        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const updateUnit = async(unit) => {
    try {
        await models.unit.update({
            type: unit.type,

        }, {
            where: {
                id: unit.id
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};


const deleteUnit = async(id) => {


    try {
        await models.unit.update({
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
    listUnit,
    addUnit,
    updateUnit,
    deleteUnit
};