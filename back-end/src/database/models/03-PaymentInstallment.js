module.exports = (sequelize, DataTypes) => {
  const PaymentInstallment = sequelize.define('PaymentInstallment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      queryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
      },
      installmentsPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      timestamps: false,
      tableName: 'payment_installments'
    },
  );

  PaymentInstallment.associate = (models) => {
    PaymentInstallment.belongsTo(models.Query,
      { foreignKey: 'queryId', as: 'installmentsQuery' });
  };

  return PaymentInstallment;
};