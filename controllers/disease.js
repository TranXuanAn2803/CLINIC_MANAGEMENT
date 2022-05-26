const apiDisease = require("../models/api/disease");

const view = (_, res) => {
    res.render('disease', { title: 'Xem bệnh nhân' });
};
const addDisease = async(req, res) => {
    const disease = {
        desciption: "cam"
    }
    try {
        await apiDisease.addDisease(disease);

    } catch (err) {
        return false;
    }
    const p = await apiDisease.listDisease();
    console.log(p);
    return true;
};
const editDisease = async(req, res) => {
    const disease = {
        id: 1,
        desciption: "viem hong"
    }

    try {
        await apiDisease.updateDisease(disease);

    } catch (err) {
        return false;
    }
    const p = await apiDisease.listDisease();
    console.log(p);
    return true;
};
const deleteDisease = async(req, res) => {
    const id = 1
    try {
        await apiDisease.deleteDisease(id);

    } catch (err) {
        return false;
    }
    const p = await apiDisease.listDisease();
    console.log(p);
    return true;
};
module.exports = {
    view,
    addDisease,
    editDisease,
    deleteDisease
};