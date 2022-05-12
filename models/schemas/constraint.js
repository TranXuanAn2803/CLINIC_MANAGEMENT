module.exports = function (sequelize, DataTypes) {
  return sequelize.define('constraint', {
    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    maxPatient: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    examinationFee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'constraint',
    schema: 'public',
    timestamps: false
  });
};
