const md5 = require('md5');

const generateMD5 = (string) => md5(string);

const validateMD5 = (password, passInDB) => {
  const validatePass = generateMD5(password);

  if (validatePass === passInDB) {
    return true;
  }

  return false;
};

module.exports = { validateMD5, generateMD5 };