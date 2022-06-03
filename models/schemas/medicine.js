const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('medicine', {
        id: {
            autoIncrement: true,
            autoIncrementIdentity: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        unit: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'unit',
                key: 'id'
            }
        },
        usermanual: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'usermanual',
                key: 'id'
            }
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'medicine',
        schema: 'public',
        timestamps: false,
        indexes: [{
            name: "medicine_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        }, ]
    });
};