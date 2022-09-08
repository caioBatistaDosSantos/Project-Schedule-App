const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const NAME = Joi.object({
  name: Joi.string().min(12).max(30).required()
    .messages({
      required: '"name" is required',
      pattern: '"name" length must be at least 12 characters long',
    }),
});

const validateName = (req, res, next) => {
  const { name } = req.body;

  const { error } = NAME.validate({ name });

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }

  next();
};

module.exports = validateName;