const { use } = require("passport");
const apiMedicine = require("../models/api/medicine");
const apiUnit = require("../models/api/unit");
const apiUsermanual = require("../models/api/usermanual");


const UNITS = ['Viên', 'Liều', 'cc'];
const USER_MANUALS = ['Cách dùng 1', 'Cách dùng 2', 'Cách dùng 3', 'Cách dùng 4'];

const view = async(_, res) => {
    const unit = await apiUnit.listUnit();
    const usermanual = await apiUsermanual.listUsermanual();



    res.render('medicine', { title: 'Thuốc', units: unit, userManuals: usermanual });
};

const listMedicine = async() => {
    const medicine = await apiMedicine.listMedicine();
    for (var m of medicine) {
        m.unit = m.unit_unit.type
        m.userManual = m.usermanual_usermanual.description
    }

    return medicine
}
const addMedicine = async(req, res) => {
    const medicine = req.body;
    try {
        await apiMedicine.addMedicine(medicine);
    } catch (err) {
        console.log(err);
    }
    // const p = await apiMedicine.listMedicine();
    // console.log(p);
};
const editMedicine = async(req, res) => {
    const medicine = req.body;
    try {
        await apiMedicine.updateMedicine(medicine);
    } catch (err) {
        console.log(err);
    }
};
const deleteMedicine = async(req, res) => {
    const medicine = req.body;
    console.log(medicine)
    for (const m of medicine) {
        try {
            await apiMedicine.deleteMedicine(m.id);
        } catch (err) {
            console.log(err);
        }
    }

};

module.exports = {
    view,
    addMedicine,
    editMedicine,
    deleteMedicine,
    listMedicine
};