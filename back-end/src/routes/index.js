const express = require('express');

const validateEmailAndPass = require('../middlewares/validateEmailAndPass');
const validateName = require('../middlewares/validateName');
const validateJWT = require('../middlewares/jwt');

const userController = require('../controllers/userController');
const installmentsController = require('../controllers/installmentsController');

const router = express.Router();

router.post('/login', validateEmailAndPass, userController.loginUser);
router.post('/register', validateEmailAndPass, validateName, userController.createUser);

router.get('/installments/:id', validateJWT, installmentsController.getPaymentInstallments);
router.get(
  '/search/installments/:date',
  validateJWT,
  installmentsController.getPaymentInstallmentsByDate,
);
router.put('/installments/:id', validateJWT, installmentsController.updatePaymentInstallments);

module.exports = router;