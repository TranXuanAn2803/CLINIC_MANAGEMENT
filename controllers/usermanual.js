const { use } = require('passport');
const apiUsermanual = require('../models/api/usermanual');

const view = (_, res) => {
    res.render('usermanual', { title: 'Hướng Dẫn Sử Dụng' });
};
const listUsermanual = async() => {

    const userManual = await apiUsermanual.listUsermanual();
    return userManual

}

const addUsermanual = async(req, res) => {
    const usermanual = req.body;
    try {
        await apiUsermanual.addUsermanual(usermanual);
    } catch (err) {
        console.log(err)
    }
};
const editUsermanual = async(req, res) => {
    const usermanual = req.body

    try {
        await apiUsermanual.updateUsermanual(usermanual);
    } catch (err) {
        console.log(err);
    }
};
const deleteUsermanual = async(req, res) => {
    const userManual = req.body;
    for (const u of userManual) {
        try {
            await apiUsermanual.deleteUsermanual(u.id);
        } catch (err) {
            console.log(err);
        }
    }
};
module.exports = {
    view,
    listUsermanual,
    addUsermanual,
    editUsermanual,
    deleteUsermanual
};