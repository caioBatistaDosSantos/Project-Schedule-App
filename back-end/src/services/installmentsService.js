const { Op } = require('sequelize');
const { PaymentInstallment } = require('../database/models');

const getPaymentInstallments = async (id) => {
  const paymentInstallments = await PaymentInstallment.findAll({ where: { queryId: id } });

  return paymentInstallments;
};

const getPaymentInstallmentsByDate = async (id, date) => {
  const paymentInstallments = await PaymentInstallment
    .findAll({
      where: {
        [Op.and]: [
          { userId: id },
          { date: { [Op.lte]: date } },
        ],
      },
    });

  return paymentInstallments;
};

const updatePaymentInstallments = async (id, status) => {
  await PaymentInstallment.update({ status }, { where: { id } });
};

module.exports = {
  getPaymentInstallments,
  getPaymentInstallmentsByDate,
  updatePaymentInstallments,
};