const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('checkup', {
        id: {
            autoIncrement: true,
            autoIncrementIdentity: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        patient: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'patient',
                key: 'id'
            }
        },
        symptoms: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'checkup',
        schema: 'public',
        timestamps: false,
        indexes: [{
            name: "checkup_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        }, ]
    });
};