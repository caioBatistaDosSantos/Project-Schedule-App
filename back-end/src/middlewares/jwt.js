const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

// test: sercret key for tests
const secretKey = process.env.JWT_SECRET || 'secret_key';

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

    // test: await needed for method "stub"
    const decoded = await jwt.verify(token, secretKey, jwtConfig);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
