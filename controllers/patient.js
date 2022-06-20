const apiPatient = require("../models/api/patient");
const apiCheckup = require("../models/api/checkup");

var moment = require('moment');
const view = (_, res) => {

    res.render('patient', { title: 'Xem bệnh nhân' });
};
const listPatient = async() => {
    const patient = await apiPatient.listPatient();
    return patient

}
const findPatient = async(m) => {
    const date = moment(m.month, 'YYYY-MM');
    const month = parseInt(date.format('MM'));
    const year = parseInt(date.format('YYYY'));
    let pt = null;
    try {
        pt = await apiPatient.findPatient(startdate, enddate);
    } catch (err) {
        console.log(err);
        return false;
    }
    for (const p of pt) {
        let stringDisease = '';
        const disease = await apiCheckup.findDisease(p.checkups.id);

        for (const d of disease) {
            stringDisease = stringDisease + (d.iddisease_disease.desciption) + ' ';
        }
        p.disease = stringDisease;
    }
    console.log(pt);
    return true;
};

const addPatient = async(req, res) => {
    const patient = req.body;
    try {
        p = await apiPatient.addPatient(patient);
    } catch (err) {
        console.log(err);

    }

};
const editPatient = async(req, res) => {
    const patient = req.body;
    try {
        await apiPatient.updatePatient(patient);
    } catch (err) {
        console.log(err);
    }
};
const deletePatient = async(req, res) => {
    const patient = req.body;
    for (const p of patient) {
        try {
            await apiPatient.deletePatient(p.id);
        } catch (err) {
            console.log(err);
        }
    }

};
module.exports = {
    listPatient,
    view,
    addPatient,
    editPatient,
    deletePatient,
    findPatient
};