const express = require('express');

const validateEmailAndPass = require('../middlewares/validateEmailAndPass');
const validateName = require('../middlewares/validateName');
const validateJWT = require('../middlewares/jwt');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', validateEmailAndPass, userController.loginUser);
router.post('/register', validateEmailAndPass, validateName, userController.createUser);

module.exports = router;