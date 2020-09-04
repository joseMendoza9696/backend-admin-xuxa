const express = require('express');
const router = new express.Router();
const { crearPedido, listarPedido, listarPedidosFecha } = require('../controllers/pedido.controller');

router.post('/crearPedido', crearPedido);

router.get('/listarPedido/:id', listarPedido);

// url/listarPedido/fecha?fecha=120934z
router.get('/listarPedido/fecha', listarPedidosFecha);

module.exports = router;
