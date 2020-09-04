const Pedido = require('../models/pedido');
const Producto = require('../models/producto');

crearPedido = async (req, res) => { // /emp/pedido/nuevo
    const pedido = new Pedido(req.body);
    try{
        await pedido.save();

        res.status(202).send(pedido);
    } catch (e) {
        res.status(400).send(e);
    }
}

listarPedido = async (req, res) => { // /emp/pedido/:id

}

listarPedidosFecha = async (req, res) => { // /emp/pedidos

}

module.exports = {
    crearPedido,
    listarPedido,
    listarPedidosFecha
}
