const { StatusCodes } = require('http-status-codes');
const { User } = require('../database/models');
const objectError = require('../utils/objectError');
const { validateMD5, generateMD5 } = require('../utils/hashMD5');

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw objectError(StatusCodes.NOT_FOUND, 'Email or password incorrect');

  const isValid = validateMD5(password, user.dataValues.password);

  if (!isValid) throw objectError(StatusCodes.NOT_FOUND, 'Email or password incorrect');

  return user;
};

const createUser = async (name, email, password) => {
  const verifyEmail = await User.findOne({ where: { email } });
  const verifyName = await User.findOne({ where: { name } });

  if (verifyEmail || verifyName) throw objectError(StatusCodes.CONFLICT, 'User already registered');

  const newPassword = generateMD5(password);

  const user = await User.create({ name, email, password: newPassword });

  return user;
};

module.exports = {
  loginUser,
  createUser,
};