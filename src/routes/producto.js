const express = require('express');
const router = new express.Router();
const { listarProductoCategoria } = require('../controllers/producto.controller');

// url/listar-producto?categoria=refrescos
router.get('/listar-producto', listarProductoCategoria);

module.exports = router;
