const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('checkup-disease', {
        idcheckup: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'checkup',
                key: 'id'
            }
        },
        iddisease: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'disease',
                key: 'id'
            }
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'checkup-disease',
        schema: 'public',
        timestamps: false,
        indexes: [{
            name: "checkup-disease_pkey",
            unique: true,
            fields: [
                { name: "idcheckup" },
                { name: "iddisease" },
            ]
        }, ]
    });
};