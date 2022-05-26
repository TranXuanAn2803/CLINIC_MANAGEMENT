const { models } = require("../../config/DBconnect");
const { QueryTypes } = require("sequelize");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const listMedicine = () => {
    return models.medicine.findAll({
        where: { isDeleted: false },

        order: [
            ['id', 'ASC'],
        ],

        include: [{
            model: models.unit,
            required: false,
            as: 'unit_unit'
        }, {
            model: models.usermanual,
            required: false,
            as: 'usermanual_usermanual'
        }],
        raw: true,
        nest: true

    });
};
const addMedicine = async(medicine) => {
    try {
        console.log(medicine)
        await models.medicine.create({
            name: medicine.name,
            unit: medicine.unit,
            usermanual: medicine.usermanual,
            price: medicine.price
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const updateMedicine = async(medicine) => {
    try {
        await models.medicine.update({
            name: medicine.name,
            unit: medicine.unit,
            usermanual: medicine.usermanual,
            price: medicine.price

        }, {
            where: {
                id: medicine.id
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};


const deleteMedicine = async(id) => {


    try {
        await models.medicine.update({
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
    listMedicine,
    addMedicine,
    updateMedicine,
    deleteMedicine
};