const apiMedicine = require("../models/api/medicine");

const view = (_, res) => {
    res.render('medicine', { title: 'Xem bệnh nhân' });
};
const addMedicine = async(req, res) => {
    const medicine = {
        name: "panadol",
        unit: '2',
        usermanual: '2',
        price: 50
    }
    try {
        await apiMedicine.addMedicine(medicine);

    } catch (err) {
        return false;
    }
    //const p = await apiMedicine.listMedicine();
    // console.log(p);
    return true;
};
const editMedicine = async(req, res) => {
    const medicine = {
        id: 1,
        name: "panadol extra",
        unit: 2,
        usermanual: 3,
        price: 60
    }

    try {
        await apiMedicine.updateMedicine(medicine);

    } catch (err) {
        return false;
    }
    const p = await apiMedicine.listMedicine();
    console.log(p);
    return true;
};
const deleteMedicine = async(req, res) => {
    const id = 1
    try {
        await apiMedicine.deleteMedicine(id);

    } catch (err) {
        return false;
    }
    const p = await apiMedicine.listMedicine();
    console.log(p);
    return true;
};
module.exports = {
    view,
    addMedicine,
    editMedicine,
    deleteMedicine
};