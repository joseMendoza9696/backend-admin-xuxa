const express = require('express');
const router = new express.Router();
const moment = require('moment');
moment.locale('es');
const empleadoAuth = require('../middleware/empleadoAuth');
const { login, logout } = require('../controllers/empleado.controller');


router.post('/emp/login', login );

router.post('/emp/logout', empleadoAuth, logout );

module.exports = router;

