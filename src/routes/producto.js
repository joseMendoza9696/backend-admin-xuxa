const express = require('express');
const empleadoAuth = require('../middleware/empleadoAuth');
const router = new express.Router();
const { listarProductoCategoria,
    listarProductos,
    productoID,
    listarCategorias } = require('../controllers/producto.controller');

router.get('/productos', empleadoAuth, listarProductos)
// url/listar-producto?categoria=1384bkjb1234ld
router.get('/listar-producto', empleadoAuth ,listarProductoCategoria);

router.get('/listar-categorias', empleadoAuth, listarCategorias);

router.get('/producto/:id', empleadoAuth, productoID);

module.exports = router;
