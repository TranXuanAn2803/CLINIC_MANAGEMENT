module.exports = function (sequelize, DataTypes) {
  return sequelize.define('checkup-medicine', {
    checkup: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'checkup',
        key: 'id'
      }
    },
    medicine: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'medicine',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'checkup-medicine',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'checkup-medicine_pkey',
        unique: true,
        fields: [
          { name: 'checkup' },
          { name: 'medicine' }
        ]
      }
    ]
  });
};
