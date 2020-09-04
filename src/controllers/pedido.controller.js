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
    const id = req.params.id;

    try {
        const pedido = await Pedido.findById(id);

        res.status(200).send(pedido);
    } catch (e) {
        res.status(400).send(e);
    }
}

listarPedidosFecha = async (req, res) => { // /emp/pedidos
    const fecha = req.query.fecha;

    try {
        const pedidos = await Pedido.find({ fecha_creacion: fecha });

        res.status(200).send(pedidos);
    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = {
    crearPedido,
    listarPedido,
    listarPedidosFecha
}
