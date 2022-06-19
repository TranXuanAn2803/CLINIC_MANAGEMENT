const apiUnit = require('../models/api/unit');

const view = (_, res) => {
    res.render('unit', { title: 'Đơn Vị' });
};
const listUnit = async() => {
    const unit = await apiUnit.listUnit();
    return unit

}

const addUnit = async(req) => {
    const unit = req.body;
    console.log(unit)

    try {
        await apiUnit.addUnit(unit);
    } catch (err) {
        console.log(err);
    }
};

const editUnit = async(req, res) => {
    const unit = req.body;
    console.log(unit)
    try {
        await apiUnit.updateUnit(unit);
    } catch (err) {
        console.log(err);
    }
};

const deleteUnit = async(req, res) => {
    const unit = req.body;
    for (const u of unit) {
        try {
            await apiUnit.deleteUnit(u.id);
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = {
    view,
    listUnit,
    addUnit,
    editUnit,
    deleteUnit
};