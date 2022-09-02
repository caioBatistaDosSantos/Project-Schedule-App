module.exports = (sequelize, DataTypes) => {
  const Query = sequelize.define('Query', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    patientsName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    methodPayment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'queries',
    underscored: true,
  });

  Query.associate = (models) => {
    Query.belongsTo(models.User,
      { foreignKey: 'userId', as: 'queryUser' });
    Query.hasMany(models.PaymentInstallment,
      { foreignKey: 'queryId', as: 'queryInstallments' });
  };

  return Query;
} 