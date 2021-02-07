const Pedido = require('../models/pedido');

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
    const limit = req.query.limit;
    const skip = req.query.skip;
    const sucursal = req.query.sucursal

    try {
        const pedidos = await Pedido.find({ fecha_creacion: fecha, sucursal_id: sucursal }).
            limit( parseInt(limit) ).
            skip( parseInt(skip) ).
            sort({ fecha_creacion: -1 }).
            populate('orden.producto_id' )

        res.status(200).send(pedidos);
    } catch (e) {
        res.status(400).send(e);
    }
}

listarPrecioPedidoFecha = async (req, res) => {
    const fecha = req.query.fecha;
    const sucursal = req.query.sucursal;
    let ingresoTotal = 0;

    try {
        const pedidos = await Pedido.find({ fecha_creacion: fecha, sucursal_id: sucursal });

        await pedidos.forEach( pedido => {
            ingresoTotal = ingresoTotal + pedido.cuenta_pedido;
        });

        res.status(200).send({ ingreso: ingresoTotal });
    } catch (e) {

    }
}

buscador = async (req, res) => {
    const search = req.query.search;
    const fecha = req.query.fecha;
    const sucursal = req.query.sucursal

    try {
        let pedidos = await Pedido.find({
            nombre_cliente: {
                $regex: new RegExp(search),
                $options: 'i'
            },
            fecha_creacion: fecha,
            sucursal_id: sucursal,
        }).sort({ fecha_creacion: -1 }).
        populate('orden.producto_id' );

        res.status(200).send(pedidos);

    } catch (e) {
        res.status(400).send(e);
    }
}

actualizarPedido = async (req, res) => {
    const pedidoId = req.query.pedido
    const sucursal = req.query.sucursal

    const updates = Object.keys(req.body);
    const allowedUpdates = ['completado'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try {
        const pedido = await Pedido.findOne({ _id: pedidoId, sucursal_id: sucursal });

        if (!pedido) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            pedido[update] = req.body[update];
        });
        await pedido.save();

        res.send(pedido);

    } catch (error) {
        res.status(400).send(error);
    }

}

// actualizarPedidos = async (req, res) => {
//     try {
//         await Pedido.updateMany({  }, { sucursal_id: '5fad9115d6df6211d99ddfc4' })
//
//         res.status(200).send({ message: 'Documentos actualizados' })
//     } catch (e) {
//         res.status(400).send(e)
//     }
// }


module.exports = {
    crearPedido,
    listarPedido,
    listarPedidosFecha,
    listarPrecioPedidoFecha,
    buscador,
    actualizarPedido
    // actualizarPedidos
}
