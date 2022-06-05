const { models } = require("../../config/DBconnect");
const { QueryTypes, where } = require("sequelize");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const username = async() => {
    const u = await models.constraint.findAll({
        attributes: ["username"]


    });
    return u[0]
};
const password = async() => {
    const p = await models.constraint.findAll({
        attributes: ["password"]

    });
    return p[0]
};
const maxPatient = async() => {
    const m = await models.constraint.findAll({
        attributes: ["maxPatient"]

    });
    return m[0]
};

const examinationFee = async() => {


    const e = await models.constraint.findAll({
        attributes: ["examinationFee"]

    });
    return e[0]
};
const editMaxPatient = async(max, old) => {
    try {
        await models.constraint.update({
            maxPatient: max
        }, {
            where: {
                maxPatient: old.maxPatient
            }
        });

    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};

const editExaminationFee = async(fee, old) => {

    try {
        await models.constraint.update({
            examinationFee: fee
        }, {
            where: {
                examinationFee: old.examinationFee
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};

module.exports = {
    username,
    password,
    maxPatient,
    examinationFee,
    editExaminationFee,
    editMaxPatient
};