const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const BODY = Joi.object({
  patientsName: Joi.string().min(6).required()
    .messages({
      required: '"patientsName" is required',
      pattern: '"patientsName" length must be at least 6 characters long',
    }),
  descripition: Joi.string().min(6).required()
    .messages({
      required: '"descripition" is required',
      pattern: '"descripition" length must be at least 6 characters long',
    }),
  totalPrice: Joi.number().required()
    .messages({
      required: '"totalPrice" is required',
    }),
  optionPayment: Joi.string().min(6).required()
    .messages({
      required: '"optionPayment" is required',
      pattern: '"optionPayment" length must be at least 6 characters long',
    }),
  methodPayment: Joi.string().min(6).required()
    .messages({
      required: '"methodPayment" is required',
      pattern: '"methodPayment" length must be at least 6 characters long',
    }),
  installmentsPrice: Joi.number().required()
    .messages({
      required: '"installmentsPrice" is a number and is required',
    }),
  dates: Joi.array().required()
    .messages({
      required: '"dates" is required',
    }),
});

const validateEmailAndPass = (req, res, next) => {
  // const {
  //   patientsName,
  //   descripition,
  //   totalPrice,
  //   optionPayment,
  //   methodPayment,
  //   installmentsPrice,
  //   dates,
  // } = req.body;

  const { error } = BODY.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }

  next();
};

module.exports = validateEmailAndPass;