const express = require('express');
const empleadoAuth = require('../middleware/empleadoAuth');
const router = new express.Router();
const { listarProductoCategoria, listarCategorias } = require('../controllers/producto.controller');

// url/listar-producto?categoria=1384bkjb1234ld
router.get('/listar-producto', empleadoAuth ,listarProductoCategoria);

router.get('/listar-categorias', empleadoAuth, listarCategorias);

module.exports = router;
