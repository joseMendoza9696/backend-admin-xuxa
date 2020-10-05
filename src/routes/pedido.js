const express = require('express');
const router = new express.Router();
const empleadoAuth = require('../middleware/empleadoAuth');
const { crearPedido, listarPedido, listarPedidosFecha, listarPrecioPedidoFecha, buscarCliente } = require('../controllers/pedido.controller');

router.post('/crearPedido', empleadoAuth ,crearPedido);

router.get('/listarPedido/:id',empleadoAuth, listarPedido);
// url/pedidosFecha?fecha=....?limit=...?skip=...
router.get('/pedidosFecha', empleadoAuth,listarPedidosFecha);
// url/pedidosFechaPrecio?fecha=...
router.get('/pedidosFechaPrecio', empleadoAuth, listarPrecioPedidoFecha);
// url/buscarCliente?nombre=...?fecha=...
router.get('/buscarCliente', empleadoAuth, buscarCliente);

module.exports = router;
