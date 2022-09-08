const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');

const JWT = require('../utils/generateJWT');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const User = await userService.loginUser(email, password);

    const { password: passDB, ...userWithoutPass } = User.dataValues;

    // test: await needed for method "stub"
    const token = await JWT.generateJWT(userWithoutPass);

    return res.status(StatusCodes.OK).json({ ...userWithoutPass, token });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const User = await userService.createUser(name, email, password);
    const { password: passDB, ...userWithoutPass } = User.dataValues;

    // test: await needed for method "stub"
    const token = await JWT.generateJWT(userWithoutPass);

    return res.status(StatusCodes.CREATED).json({ ...userWithoutPass, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  createUser,
};