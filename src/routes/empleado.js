const express = require('express');
const router = new express.Router();
const moment = require('moment');
moment.locale('es');

const empleadoAuth = require('../middleware/empleadoAuth');

const { login, logout, ventasFecha } = require('../controllers/empleado.controller');

router.post('/emp/login', login );

router.post('/emp/logout', logout );

router.get('/emp/ventasFecha/:date', ventasFecha );

module.exports = router;

