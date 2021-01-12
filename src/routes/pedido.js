const express = require('express');
const router = new express.Router();
const empleadoAuth = require('../middleware/empleadoAuth');
const {
    crearPedido,
    listarPedido,
    listarPedidosFecha,
    listarPrecioPedidoFecha,
    actualizarPedido,
    buscador } = require('../controllers/pedido.controller');

router.post('/crearPedido', empleadoAuth ,crearPedido);

router.get('/listarPedido/:id',empleadoAuth, listarPedido);
// url/pedidosFecha?fecha=....&limit=...&skip=...&sucursal=...
router.get('/pedidosFecha', empleadoAuth,listarPedidosFecha);
// url/pedidosFechaPrecio?fecha=...&sucursal=...
router.get('/pedidosFechaPrecio', empleadoAuth, listarPrecioPedidoFecha);
// url/buscarCliente?search=...&fecha=...&sucursal=...
router.get('/buscar', empleadoAuth, buscador);
// url/actualizarPedido?pedido=...?sucursal=...
router.patch('/actualizarPedido', empleadoAuth, actualizarPedido)

//actualizar pedidos
// router.get('/actualizar-emergency', empleadoAuth, actualizarPedidos )

module.exports = router;
