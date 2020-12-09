const express = require('express');
const router = new express.Router();
const empleadoAuth = require('../middleware/empleadoAuth');
const { alitas } = require('../controllers/estadisticas.controller')

// url/estadistica/alitas?fecha=...&sucursal=...
router.get('/estadistica/alitas', empleadoAuth, alitas)

module.exports = router;
