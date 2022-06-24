const apiCheckup = require('../models/api/checkup');
const apiConstraint = require('../models/api/constraint');
const apiMedicine = require('../models/api/medicine');
const apiDisease = require('../models/api/disease');
const apiPatient = require('../models/api/patient');
const moment = require('moment');

const view = async(_, res) => {
    const patients = await apiPatient.listPatient();
    res.render('checkup', { title: 'Phiếu khám', patients });
};

const viewEditCheckup = async(req, res) => {
    const id = req.params.id;
    const checkup = (await apiCheckup.findCheckUp(id))[0];
    const medicines = await apiMedicine.listMedicine();
    const diseases = await apiDisease.listDisease();
    res.render('checkup-edit', { title: 'Sửa phiếu khám', checkup, medicines, diseases });
};

const viewBill = async(req, res) => {
    const id = req.params.id;
    const checkup = (await apiCheckup.findCheckUp(id))[0];
    const { examinationFee } = await apiConstraint.examinationFee;
    const medicineFee = 1000;
    res.render('checkup-bill', { title: 'Hoá đơn', checkup, examinationFee, medicineFee });
};
const viewMedicine = async(id) => {
    const medicine = await apiCheckup.findMedicine(id.id);
    for (const m of medicine) {
        m.medicine_medicine = m.medicine_medicine.name;
    }

    return medicine;
};
const viewDisease = async(id) => {
    const disease = await apiCheckup.findDisease(id.id);
    for (const d of disease) {
        d.iddisease_disease = d.iddisease_disease.description;
    }

    return disease;
};

const viewlist = async(req, res) => {
    const checkup = await apiCheckup.listCheckUp2();
    for (const c of checkup) {
        let stringDisease = '';
        let stringMedicine = '';
        const disease = await apiCheckup.findDisease(c.id);
        const medicine = await apiCheckup.findMedicine(c.id);

        for (const d of disease) {
            stringDisease = stringDisease + (d.iddisease_disease.description) + ', ';
        }
        c.disease = stringDisease;
        for (const m of medicine) {
            stringMedicine = stringMedicine + (m.medicine_medicine.name) + ', ';
        }
        c.medicine = stringMedicine;
        c.patient_patient = c.patient_patient.name
    }
    return checkup;
};
const viewlistOfMonth = async(m) => {
    const date = moment(m.month, 'YYYY-MM');
    const month = parseInt(date.format('MM'));
    const year = parseInt(date.format('YYYY'));

    const checkup = await apiCheckup.listCheckUpOfMonth(month, year);
    for (const c of checkup) {
        let stringDisease = '';
        let stringMedicine = '';
        const disease = await apiCheckup.findDisease(c.id);
        const medicine = await apiCheckup.findMedicine(c.id);

        for (const d of disease) {
            stringDisease = stringDisease + (d.iddisease_disease.description) + ', ';
        }
        c.disease = stringDisease;
        for (const m of medicine) {
            stringMedicine = stringMedicine + (m.medicine_medicine.name) + ', ';
        }
        c.medicine = stringMedicine;
        c.patient_patient = c.patient_patient.name
    }
    return checkup;
};

const viewListPatientOfDate = async(req, res) => {
    const date = moment('2022-1-17', 'YYYY-MM-DD');
    const p = await apiCheckup.listPatientOfDate(date);
    console.log(p);
};

const viewCheckUp = async(req, res) => {
    const id = 11;
    const checkup = await apiCheckup.findCheckUp(id);
    let stringDisease = '';
    const disease = await apiCheckup.findDisease(id);
    const medicine = await apiCheckup.findMedicine(id);

    for (const d of disease) {
        stringDisease = stringDisease + (d.iddisease_disease.description) + ' ';
    }
    checkup.disease = stringDisease;

    console.log(checkup, medicine);
};

const addCheckup = async(req, res) => {
    const checkup = req.body;
    let maxPatient = await apiConstraint.maxPatient;
    maxPatient = parseInt(maxPatient.maxPatient);

    const date = moment(checkup.date, 'YYYY-MM-DD');
    let count = await apiCheckup.countPatientOfDate(date);
    count = count[0];
    if (parseInt(count.count) < maxPatient) {
        try {
            await apiCheckup.addCheckup(checkup);
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log('to many patients');
    }
    console.log("hdhdhdh")
};
const addDisease = async(req, res) => {
    const checkupDisease = req.body;
    var disease = await apiCheckup.findDisease2(checkupDisease.idcheckup, checkupDisease.iddisease)
    if (disease === null || disease === undefined || disease.length === 0) {
        {
            try {
                await apiCheckup.addDisease(checkupDisease);
            } catch (err) {
                console.log(err);
            }
        }
    }

};
const editDisease = async(req, res) => {
    const checkupDisease = req.body;
    var disease = await apiCheckup.findDisease2(checkupDisease.idcheckup, checkupDisease.iddisease)
    disease = disease[0]
    console.log(disease)
    console.log(checkupDisease)
    if (disease === null || disease === undefined || disease.length === 0 || disease.iddisease === checkupDisease.olddisease) {
        {

            try {
                await apiCheckup.updateDisease(checkupDisease);
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        try {
            await apiCheckup.deleteDisease(checkupDisease.idcheckup, checkupDisease.olddisease);
        } catch (err) {
            console.log(err);
        }
    }

};
const deleteDisease = async(req, res) => {
    const disease = req.body;
    for (const d of disease) {
        try {
            await apiCheckup.deleteDisease(d.idcheckup, d.iddisease);
        } catch (err) {
            console.log(err);
        }
    }
};

const addMedicine = async(req, res) => {
    const checkupMedicine = req.body;
    var medicine = await apiCheckup.findMedicine2(checkupMedicine.checkup, checkupMedicine.medicine)
    if (medicine === null || medicine === undefined || medicine.length === 0) {
        {
            try {
                await apiCheckup.addMedicine(checkupMedicine);
            } catch (err) {
                return false;
            }
        }
    } else {
        medicine = medicine[0]
        medicine.number = medicine.number + checkupMedicine.number
        medicine.oldmedicine = medicine.medicine
        console.log(medicine)
        try {
            await apiCheckup.updateMedicine(medicine);
        } catch (err) {
            return false;
        }
    }
}
const editMedicine = async(req, res) => {
    const checkupMedicine = req.body;
    var medicine = await apiCheckup.findMedicine2(checkupMedicine.checkup, checkupMedicine.medicine)
    medicine = medicine[0]

    if (medicine === null || medicine === undefined || medicine.length === 0 || medicine.medicine === checkupMedicine.oldmedicine) {

        {
            try {
                await apiCheckup.updateMedicine(checkupMedicine);
            } catch (err) {
                console.log(err);
            }
            return true;

        }
    } else {
        medicine.number = medicine.number + checkupMedicine.number
        medicine.oldmedicine = medicine.medicine
        console.log(medicine)
        try {
            await apiCheckup.updateMedicine(medicine);
        } catch (err) {
            return false;
        }

        try {
            await apiCheckup.deleteMedicine(checkupMedicine.checkup, checkupMedicine.oldmedicine);
        } catch (err) {
            console.log(err);
        }

    }
};
const deleteMedicine = async(req, res) => {
    console.log(req.body)
    const medicine = req.body;
    for (const m of medicine) {
        try {
            await apiCheckup.deleteMedicine(m.checkup, m.medicine);
        } catch (err) {
            console.log(err);
        }
    }
};
const editCheckup = async(req, res) => {
    const checkup = {
        id: 1,
        patient: 2,
        symptoms: 'ho, dau hong',
        date: '2022-01-31'
    };

    try {
        await apiCheckup.updateCheckup(checkup);
    } catch (err) {
        return false;
    }
    const p = await apiCheckup.listCheckUp();
    console.log(p);
    return true;
};

const deleteCheckUp = async(req, res) => {
    const checkup = req.body;
    for (const c of checkup) {
        try {
            await apiCheckup.deleteCheckUp(c.id);
        } catch (err) {
            console.log(err);
        }
        try {
            await apiCheckup.deleteCheckUpDisease(c.id);
        } catch (err) {
            console.log(err);
        }
        try {
            await apiCheckup.deleteCheckUpMedicine(c.id);
        } catch (err) {
            console.log(err);
        }
    }
};

const exportBill = async(req, res) => {
    const id = req.params;
    console.log(id.id)
    let medicinefee = 0;
    let b = undefined
    b = await apiCheckup.findBill(id.id);
    if (b === null || b === undefined || b.length === 0) {
        const medicine = await apiCheckup.findMedicine(id.id);
        for (const m of medicine) {
            medicinefee = medicinefee + parseInt(m.number) * parseInt(m.medicine_medicine.price);
        }
        let examinationFee = await apiConstraint.examinationFee;
        examinationFee = examinationFee.examinationFee;

        const bill = {
            checkup: id.id,
            examinationFee: parseInt(medicinefee) + parseInt(examinationFee),
            medicineFee: medicinefee
        };
        try {
            await apiCheckup.addBill(bill);
        } catch (err) {
            console.log(err);
        }

    } else {
        const medicine = await apiCheckup.findMedicine(id.id);
        for (const m of medicine) {
            medicinefee = medicinefee + parseInt(m.number) * parseInt(m.medicine_medicine.price);
        }
        let examinationFee = await apiConstraint.examinationFee;
        examinationFee = examinationFee.examinationFee;


        const bill = {
            checkup: id.id,
            examinationFee: parseInt(medicinefee) + parseInt(examinationFee),
            medicineFee: medicinefee
        };
        try {
            await apiCheckup.updateBill(bill);
        } catch (err) {
            return false;
        }

    }
    b = (await apiCheckup.findBill(id.id))[0];
    b.name = b.checkup_checkup.patient_patient.name
    b.date = b.checkup_checkup.date
    console.log(b);

    res.render('checkup-bill', { title: 'Hoá đơn', b });

};

const saleReport = async(m) => {
    const date = moment(m.month, 'YYYY-MM');
    const month = parseInt(date.format('MM'));
    const year = parseInt(date.format('YYYY'));
    const report = await apiCheckup.saleReport(month, year);
    var sum = 0;
    for (const r of report) {
        if (r.sumOfFee === null || r.sumOfFee === undefined || r.sumOfFee === NaN) continue
        sum = sum + parseInt(r.sumOfFee);
    }
    console.log(sum)

    for (const r of report) {
        r.percentage = r.sumOfFee / sum;
    }
    return report


};

const medicineReport = async(m) => {
    const date = moment(m.month, 'YYYY-MM');
    var month = parseInt(date.format('MM'));
    var year = parseInt(date.format('YYYY'));

    const report = await apiCheckup.medicineReport(month, year);
    console.log(report)
    var deleteItem = []
    for (let i = 0; i < report.length; i++) {
        var checkDelete = false
        for (const di of deleteItem) {
            if (di === i) {
                checkDelete = true;
                break;
            }
        }
        if (checkDelete) continue
        for (let j = i + 1; j < report.length; j++) {
            for (const di of deleteItem) {
                if (di === j) {
                    checkDelete = true;
                    break;
                }
            }
            if (checkDelete) continue
            if (report[i].id === report[j].id) {
                delete report[j]
                deleteItem.push(j)
            }

        }
    }
    return report;
}

const getConst = async(req, res) => {
    const username = await apiConstraint.username;
    const password = await apiConstraint.password;
    const examinationFee = await apiConstraint.examinationFee;
    const maxPatient = await apiConstraint.maxPatient;
    console.log(username.username, password.password, examinationFee.examinationFee, maxPatient.maxPatient);
    return true;
};

module.exports = {
    view,
    viewEditCheckup,
    viewBill,
    addCheckup,
    editCheckup,
    deleteCheckUp,
    addDisease,
    viewlist,
    editDisease,
    deleteDisease,
    addMedicine,
    editMedicine,
    deleteMedicine,
    exportBill,
    saleReport,
    medicineReport,
    getConst,
    viewListPatientOfDate,
    viewCheckUp,
    viewDisease,
    viewMedicine,
    viewlistOfMonth
};