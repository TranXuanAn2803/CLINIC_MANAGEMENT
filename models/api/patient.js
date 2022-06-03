const { models } = require("../../config/DBconnect");
const { QueryTypes } = require("sequelize");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const listPatient = () => {
    return models.patient.findAll({
        order: [
            ['id', 'ASC'],
        ],
    });
};
const findPatient = (startdate, enddate) => {
    return models.patient.findAll({
        order: [
            ['id', 'ASC'],
        ],
        include: [{
            model: models.checkup,
            required: true,
            as: 'checkups',
            where: {
                date: {
                    [Op.gte]: startdate,
                    [Op.lte]: enddate,

                }
            },

        }, ],
        raw: true,
        nest: true


    });

}
const addPatient = async(patient) => {
    try {
        await models.patient.create({
            name: patient.name,
            gender: patient.gender,
            yearOfBirth: patient.yearOfBirth,
            address: patient.address

        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const updatePatient = async(patient) => {
    try {
        await models.patient.update({
            name: patient.name,
            gender: patient.gender,
            yearOfBirth: patient.yearOfBirth,
            address: patient.address
        }, {
            where: {
                id: patient.id
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const deletePatient = async(id) => {


    try {
        await models.patient.destroy({
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
    listPatient,
    addPatient,
    updatePatient,
    deletePatient,
    findPatient
};