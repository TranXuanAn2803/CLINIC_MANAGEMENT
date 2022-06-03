module.exports = (sequelize, DataTypes) =>
  sequelize.define('bill', {
    checkup: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: { model: 'checkup', key: 'id' }
    },
    examinationFee: { type: DataTypes.DECIMAL, allowNull: true },
    medicineFee: { type: DataTypes.DECIMAL, allowNull: true }
  }, {
    sequelize,
    tableName: 'bill',
    schema: 'public',
    timestamps: false,
    indexes: [{ name: 'bill_pkey', unique: true, fields: [{ name: 'checkup' }] }]
  });
