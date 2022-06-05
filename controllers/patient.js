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
const findPatient = async(req, res) => {
    const startdate = moment("2022-1-1", "YYYY-MM-DD");

    const enddate = moment("2022-1-31", "YYYY-MM-DD")
    let pt = null
    try {
        pt = await apiPatient.findPatient(startdate, enddate);


    } catch (err) {
        console.log(err)
        return false;
    }
    for (var p of pt) {
        var stringDisease = ""
        var disease = await apiCheckup.findDisease(p.checkups.id)

        for (var d of disease) {
            stringDisease = stringDisease + (d.iddisease_disease.description) + " "
        }
        p.disease = stringDisease

    }
    console.log(pt)
    return true;
};

const addPatient = async(req, res) => {

    const user = req.body
    try {
        await apiPatient.addPatient(user);

    } catch (err) {
        return false;
    }
    const p = await apiPatient.listPatient();
    console.log(p);
    return true;
};
const editPatient = async(req, res) => {
    const user = req.body
    try {
        await apiPatient.updatePatient(user);

    } catch (err) {
        return false;
    }
    const p = await apiPatient.listPatient();
    console.log(p);
    return true;
};
const deletePatient = async(req, res) => {
    const id = 1
    try {
        await apiPatient.deletePatient(id);

    } catch (err) {
        return false;
    }
    const p = await apiPatient.listPatient();
    console.log(p);
    return true;
};
module.exports = {
    listPatient,
    view,
    addPatient,
    editPatient,
    deletePatient,
    findPatient
};