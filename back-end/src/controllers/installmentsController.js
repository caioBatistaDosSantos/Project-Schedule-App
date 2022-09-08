const { StatusCodes } = require('http-status-codes');
const installmentsService = require('../services/installmentsService');

const getPaymentInstallments = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Enter a valid id',
      });
    }

    const paymentInstallments = await installmentsService.getPaymentInstallments(id);

    return res.status(StatusCodes.OK).json({ paymentInstallments });
  } catch (error) {
    next(error);
  }
};

const getPaymentInstallmentsByDate = async (req, res, next) => {
  try {
    const { data: { id } } = req.user;
    const { date } = req.params;

    if (!date) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Enter a valid date',
      });
    }

    const paymentInstallments = await installmentsService.getPaymentInstallmentsByDate(id, date);

    return res.status(StatusCodes.OK).json({ paymentInstallments });
  } catch (error) {
    next(error);
  }
};

const updatePaymentInstallments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status === undefined || !id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Enter a valid status and id',
      });
    }

    await installmentsService.updatePaymentInstallments(id, status);

    return res.status(StatusCodes.OK).json({ message: 'Updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPaymentInstallments,
  getPaymentInstallmentsByDate,
  updatePaymentInstallments,
};