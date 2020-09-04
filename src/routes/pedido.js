const express = require('express');
const router = new express.Router();
const empleadoAuth = require('../middleware/empleadoAuth');
const { crearPedido, listarPedido, listarPedidosFecha } = require('../controllers/pedido.controller');

router.post('/crearPedido', empleadoAuth ,crearPedido);

router.get('/listarPedido/:id', listarPedido);

// url/pedidosFecha?fecha=2020-09-03
router.get('/pedidosFecha', empleadoAuth,listarPedidosFecha);

module.exports = router;
