const express = require('express');
const router = new express.Router();
const empleadoAuth = require('../middleware/empleadoAuth');
const { alitasFecha } = require('../controllers/estadisticas.controller')

// rutas

module.exports = router;
