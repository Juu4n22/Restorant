const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//RUTAS DE AUTENTICACIÓN
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;