const Pedido = require('../models/pedido');
const Producto = require('../models/producto');

const https = require('https');

crearPedido = async (req, res) => { // /emp/pedido/nuevo
    const pedido = new Pedido(req.body);

    try{
        await pedido.save();

        res.status(202).send(pedido);
    } catch (e) {
        console.log(e)
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
    const limit = req.query.limit;
    const skip = req.query.skip;

    try {
        const pedidos = await Pedido.find({ fecha_creacion: fecha }).
            limit( parseInt(limit) ).
            skip( parseInt(skip) ).
            sort({ hora_creacion: -1 })

        res.status(200).send(pedidos);
    } catch (e) {
        res.status(400).send(e);
    }
}

listarPrecioPedidoFecha = async (req, res) => {
    const fecha = req.query.fecha;
    let ingresoTotal = 0;

    try {
        const pedidos = await Pedido.find({ fecha_creacion: fecha });

        await pedidos.forEach( pedido => {
            ingresoTotal = ingresoTotal + pedido.cuenta_pedido;
        });

        res.status(200).send({ ingreso: ingresoTotal });
    } catch (e) {

    }
}

buscarCliente = async (req, res) => {
    const nombre = req.query.nombre;
    const fecha = req.query.fecha;
    try {
        let pedidos = await Pedido.find({
            nombre_cliente: {
                $regex: new RegExp(nombre),
                $options: 'i'
            },
            fecha_creacion: fecha
        }).sort({ hora_creacion: -1 });

        res.status(200).send(pedidos);

    } catch (e) {
        res.status(400).send(e);
    }
}

actualizarPedidos = async (req, res) => {
    try {
        await Pedido.updateMany({  }, { sucursal_id: '5fad9115d6df6211d99ddfc4' })

        res.status(200).send({ message: 'Documentos actualizados' })
    } catch (e) {
        res.status(400).send(e)
    }
}


module.exports = {
    crearPedido,
    listarPedido,
    listarPedidosFecha,
    listarPrecioPedidoFecha,
    buscarCliente,
    actualizarPedidos
}
