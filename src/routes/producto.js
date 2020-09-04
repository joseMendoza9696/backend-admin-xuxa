const express = require('express');
const empleadoAuth = require('../middleware/empleadoAuth');
const router = new express.Router();
const { listarProductoCategoria } = require('../controllers/producto.controller');

// url/listar-producto?categoria=1384bkjb1234ld
router.get('/listar-producto', empleadoAuth ,listarProductoCategoria);

module.exports = router;
