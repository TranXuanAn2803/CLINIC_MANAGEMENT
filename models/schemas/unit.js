const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('unit', {
        id: {
            autoIncrement: true,
            autoIncrementIdentity: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'unit',
        schema: 'public',
        timestamps: false,
        indexes: [{
            name: "unit_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        }, ]
    });
};