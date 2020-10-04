const express = require('express');
const router = new express.Router();
const empleadoAuth = require('../middleware/empleadoAuth');
const { crearPedido, listarPedido, listarPedidosFecha } = require('../controllers/pedido.controller');

router.post('/crearPedido', empleadoAuth ,crearPedido);

router.get('/listarPedido/:id',empleadoAuth, listarPedido);

// url/pedidosFecha?fecha=....?limit=...?skip=...
router.get('/pedidosFecha', empleadoAuth,listarPedidosFecha);

module.exports = router;
