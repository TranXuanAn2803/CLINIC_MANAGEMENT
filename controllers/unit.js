const apiUnit = require("../models/api/unit");

const view = (_, res) => {
    res.render('unit', { title: 'Xem bệnh nhân' });
};
const listUnit = async(req, res) => {
    const unit = await apiUnit.listUnit();
    return unit;
};

const addUnit = async(req, res) => {
    const unit = {
        type: "vien"
    }
    try {
        await apiUnit.addUnit(unit);

    } catch (err) {
        return false;
    }
    const p = await apiUnit.listUnit();
    console.log(p);
    return true;
};
const editUnit = async(req, res) => {
    const unit = {
        id: 1,
        type: "vi"
    }

    try {
        await apiUnit.updateUnit(unit);

    } catch (err) {
        return false;
    }
    const p = await apiUnit.listUnit();
    console.log(p);
    return true;
};
const deleteUnit = async(req, res) => {
    const id = 1
    try {
        await apiUnit.deleteUnit(id);

    } catch (err) {
        return false;
    }
    const p = await apiUnit.listUnit();
    console.log(p);
    return true;
};
module.exports = {
    view,
    addUnit,
    editUnit,
    deleteUnit,
    listUnit
};