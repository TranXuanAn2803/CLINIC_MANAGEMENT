const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
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
    gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    yearOfBirth: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'patient',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "patient_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
