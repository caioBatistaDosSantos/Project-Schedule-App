const jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '180m',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign({ data: payload }, key, jwtConfig);

  return token;
};

module.exports = generateJWT; 
