const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const key = process.env.JWT_SECRET;

const secretKey = key || 'secret_key';

const jwtConfig = {
  expiresIn: '180m',
  algorithm: 'HS256',
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Token not found' });
    }

    const decoded = jwt.verify(token, secretKey, jwtConfig);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
