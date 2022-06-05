const apiUsermanual = require("../models/api/usermanual");

const view = (_, res) => {
    res.render('usermanual', { title: 'Xem bệnh nhân' });
};
const listUsermanual = async(req, res) => {
    const usermanual = await apiUsermanual.listUsermanual();
    return usermanual;
};

const addUsermanual = async(req, res) => {
    const usermanual = {
        description: "1 ngay 1 vien"
    }
    try {
        await apiUsermanual.addUsermanual(usermanual);

    } catch (err) {
        return false;
    }
    const p = await apiUsermanual.listUsermanual();
    console.log(p);
    return true;
};
const editUsermanual = async(req, res) => {
    const usermanual = {
        id: 2,
        description: "1 ngay 2 vien"
    }

    try {
        await apiUsermanual.updateUsermanual(usermanual);

    } catch (err) {
        return false;
    }
    const p = await apiUsermanual.listUsermanual();
    console.log(p);
    return true;
};
const deleteUsermanual = async(req, res) => {
    const id = 1
    try {
        await apiUsermanual.deleteUsermanual(id);

    } catch (err) {
        return false;
    }
    const p = await apiUsermanual.listUsermanual();
    console.log(p);
    return true;
};
module.exports = {
    view,
    addUsermanual,
    editUsermanual,
    deleteUsermanual,
    listUsermanual
};