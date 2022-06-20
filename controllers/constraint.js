const apiConstraint = require("../models/api/constraint");
const view = async(_, res) => {
    const name = await apiConstraint.username
    var c = await apiConstraint.find(name.username)
    c = c[0]
    console.log(c)
    res.render('constraint', {
        title: 'Quy định',
        username: c.username,
        password: c.password,
        maxPatient: c.maxPatient,
        examinationFee: c.examinationFee
    });
};
const editContraint = async(req, res) => {
    const newConstraint = req.body
    const name = await apiConstraint.username
    console.log(newConstraint)
    try {
        await apiConstraint.updateConstraint(newConstraint, name);
    } catch (err) {
        return false;
    }

    const constraint = await apiConstraint.find(name.username)
};

module.exports = { view, editContraint };