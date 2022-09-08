const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const BODY = Joi.object({
  password: Joi.string().min(6).required()
    .messages({
      required: '"password" is required',
      pattern: '"password" length must be at least 6 characters long',
    }),
  email: Joi.string().required()
    .messages({
      required: '"email" is required',
    }),
});

const validateEmailAndPass = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = BODY.validate({ password, email });
  const validateEmail = email.includes('@' && '.com');

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }

  if (!validateEmail) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"email" must be a valid email' });
  }

  next();
};

module.exports = validateEmailAndPass;