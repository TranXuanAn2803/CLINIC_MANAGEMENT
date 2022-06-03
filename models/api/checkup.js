const { models } = require("../../config/DBconnect");
const { QueryTypes, where } = require("sequelize");
const sequelize = require("sequelize");
const async = require("hbs/lib/async");
const checkup = require("../schemas/checkup");
const medicine = require("../schemas/medicine");
const Op = sequelize.Op;

const listCheckUp = () => {
    return models.checkup.findAll({
        where: { isDeleted: false },

        order: [
            ['id', 'ASC'],
        ],
        include: [{
                model: models.patient,
                required: true,
                as: 'patient_patient'
            },

            {

                model: models.checkupDisease,
                required: false,
                as: 'checkup-diseases',
                where: { isDeleted: false },
                include: {
                    model: models.disease,
                    required: false,
                    as: 'iddisease_disease',

                },
            }, {
                model: models.checkupMedicine,
                required: false,
                as: 'checkup-medicines',
                where: { isDeleted: false },
                include: {
                    model: models.medicine,
                    required: false,
                    as: 'medicine_medicine',
                },

            }


        ],
        raw: true,
        nest: true
    });

};
const listCheckUp2 = () => {
    return models.checkup.findAll({
        where: { isDeleted: false },

        order: [
            ['id', 'ASC'],
        ],
        include: [{
                model: models.patient,
                required: true,
                as: 'patient_patient'
            },




        ],
        raw: true,
        nest: true
    });

};
const findCheckUp = (id) => {
    return models.checkup.findAll({
        where: {
            isDeleted: false,
            id: id
        },

        order: [
            ['id', 'ASC'],
        ],
        include: [{
                model: models.patient,
                required: true,
                as: 'patient_patient'
            },

        ],
        raw: true,
        nest: true
    });

};

const findDisease = async(idcheckup) => {
    return models.checkupDisease.findAll({
        where: {
            isDeleted: false,
            idcheckup: idcheckup
        },

        order: [
            ['iddisease', 'ASC'],
        ],
        include: [

            {
                model: models.disease,
                required: false,
                as: 'iddisease_disease'
            },
        ],
        raw: true,
        nest: true
    });

}
const findMedicine = async(idcheckup) => {
    return models.checkupMedicine.findAll({
        where: {
            isDeleted: false,
            checkup: idcheckup
        },

        order: [
            ['medicine', 'ASC'],
        ],
        include: [

            {
                model: models.medicine,
                required: false,
                as: 'medicine_medicine'
            },
        ],
        raw: true,
        nest: true
    });

}

const addCheckup = async(checkup) => {
    try {
        await models.checkup.create({
            patient: checkup.patient,
            symptoms: checkup.symptoms,
            date: checkup.date
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};

const addDisease = async(checkupDisease) => {
    try {
        await models.checkupDisease.create({
            idcheckup: checkupDisease.idcheckup,
            iddisease: checkupDisease.iddisease,
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }

}
const updateDisease = async(checkupDisease) => {
    try {
        await models.checkupDisease.update({
                iddisease: checkupDisease.newdisease,
            }, {
                where: {
                    idcheckup: checkupDisease.idcheckup,
                    iddisease: checkupDisease.olddisease,
                }
            },


        );
    } catch (err) {
        console.log(err.message)
        throw (err)
    }

}
const deleteDisease = async(idcheckup, iddisease) => {

    try {
        await models.checkupDisease.update({
            isDeleted: true,
        }, {
            where: {
                idcheckup: idcheckup,
                iddisease: iddisease,
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const addMedicine = async(checkupMedicine) => {
    try {
        await models.checkupMedicine.create({
            checkup: checkupMedicine.checkup,
            medicine: checkupMedicine.medicine,
            number: checkupMedicine.number
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }

}

const updateMedicine = async(checkupMedicine) => {
    try {
        await models.checkupMedicine.update({
                medicine: checkupMedicine.newmedicine,
                number: checkupMedicine.number
            }, {
                where: {
                    checkup: checkupMedicine.checkup,
                    medicine: checkupMedicine.oldmedicine,
                }
            },


        );
    } catch (err) {
        console.log(err.message)
        throw (err)
    }

}
const deleteMedicine = async(idcheckup, idmedicine) => {

    try {
        await models.checkupMedicine.update({
            isDeleted: true,
        }, {
            where: {
                checkup: idcheckup,
                medicine: idmedicine,
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }

};

const updateCheckup = async(checkup) => {
    try {
        await models.checkup.update({
            patient: checkup.patient,
            symptoms: checkup.symptoms,
            date: checkup.date

        }, {
            where: {
                id: checkup.id
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const deleteCheckUp = async(id) => {


    try {
        await models.checkup.update({
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
const deleteCheckUp_Medicine = async(id) => {
    try {
        await models.checkupMedicine.update({
            isDeleted: true,
        }, {
            where: {
                checkup: id,
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const deleteCheckUp_Disease = async(id) => {


    try {
        await models.checkupDisease.update({
            isDeleted: true,
        }, {
            where: {
                idcheckup: id,
            }
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }
};
const listBill = () => {
    return models.bill.findAll({

        order: [
            ['checkup', 'ASC'],
        ],

        raw: true,
        nest: true
    });

};
const findBill = async(idcheckup) => {
    return models.bill.findAll({
        where: {
            checkup: idcheckup
        },
    });
}

const addBill = async(bill) => {
    try {
        await models.bill.create({
            checkup: bill.checkup,
            examinationFee: bill.examinationFee,
            medicineFee: bill.medicineFee
        });
    } catch (err) {
        console.log(err.message)
        throw (err)
    }

}
const saleReport = (month, year) => {
    return models.checkup.findAll({
        attributes: ['date', [sequelize.literal('COUNT("patient_patient")'), 'countOfPatient'],

            [sequelize.literal('SUM("examinationFee")'), 'sumOfFee']


        ],


        where: {
            [Op.and]: [
                sequelize.fn('EXTRACT(MONTH from "date") =', month),
                sequelize.fn('EXTRACT(YEAR from "date") =', year),
            ],
            isDeleted: false,
        },


        order: [
            ['date', 'ASC'],
        ],
        include: [{
            model: models.patient,
            required: true,
            as: 'patient_patient',
            attributes: []

        }, {
            model: models.bill,
            required: false,
            as: 'bill',
            attributes: []

        }],
        group: ["date"],

        raw: true,
        nest: true
    });

};
const medicineReport = (month, year) => {
    return models.medicine.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('"medicine"."id"')), 'id'],

            'name', [sequelize.literal('COUNT("checkup_checkups")'), 'countOfCheckup'],
            [sequelize.literal('SUM("checkup-medicines"."number")'), 'sumofNumber'],
        ],
        /*attributes: ['id', //[sequelize.literal('COUNT("checkup_checkups")'), 'countOfCheckup'],
            //
            //


        ],*/

        order: [
            ['id', 'ASC'],
        ],
        include: [{
                model: models.checkup,
                required: true,
                as: 'checkup_checkups',
                attributes: [],

                where: {
                    [Op.and]: [
                        sequelize.fn('EXTRACT(MONTH from "date") =', month),
                        sequelize.fn('EXTRACT(YEAR from "date") =', year),
                    ],

                    isDeleted: false,
                },
                include: {
                    model: models.checkupMedicine,
                    required: false,
                    as: 'checkup-medicine',
                    attributes: []
                },
            },
            {
                model: models.checkupMedicine,
                required: false,
                as: 'checkup-medicines',
                attributes: []
            }
        ],
        group: ['medicine.id', 'name', "checkup_checkups->checkup-medicine.checkup", "checkup_checkups->checkup-medicine.medicine"],
        raw: true,
        nest: true
    });

};

const listPatientOfDate = (date) => {
    return models.checkup.findAll({
        where: {
            date: date,
            isDeleted: false,
        },
        order: [
            ['id', 'ASC'],
        ],
        include: [{
            model: models.patient,
            required: true,
            as: 'patient_patient',
        }, ],

        raw: true,
        nest: true
    });

};
const countPatientOfDate = (date) => {
    return models.checkup.findAll({
        attributes: [
            [sequelize.literal('COUNT("patient_patient")'), 'count']
        ],
        where: {
            date: date,
            isDeleted: false,
        },
        include: [{
            model: models.patient,
            required: true,
            as: 'patient_patient',
            attributes: []
        }, ],
        raw: true,
        nest: true
    });

};

module.exports = {
    listCheckUp,
    addCheckup,
    updateCheckup,
    deleteCheckUp,
    addDisease,
    findDisease,
    findMedicine,
    updateDisease,
    deleteDisease,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    listCheckUp2,
    addBill,
    findBill,
    listBill,
    saleReport,
    medicineReport,
    listPatientOfDate,
    countPatientOfDate,
    deleteCheckUp_Disease,
    deleteCheckUp_Medicine,
    findCheckUp
};