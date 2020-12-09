const Pedido = require('../models/pedido');
var mongoose = require('mongoose');

alitas = async (req, res) => {
    const fecha = req.query.fecha
    const sucursal = req.query.sucursal
    let estadistica = {
        alitas6: 0,
        alitas12: 0,
        alitas18: 0,
        alitas24: 0,
        total: 0
    }

    try{
        const pedidos = await Pedido.find({
            fecha_creacion: fecha,
            sucursal_id: sucursal
        }).
        populate('orden.producto_id')

        await pedidos.forEach( pedido => {
            pedido.orden.forEach(o => {
                if ( o.producto_id.categoria_id.toString() === '5f519a31af3d7403b74f91a5' ) {
                    // verificamos 6 alitas
                    if( o.producto_id._id.toString() === '5f519a7daf3d7403b74f91a6' ) {
                        let sum = o.cantidad * 6
                        estadistica.alitas6 = estadistica.alitas6 + sum
                        estadistica.total = estadistica.total + sum
                        // verificamos 12 alitas
                    } else if( o.producto_id._id.toString() === '5f519aa9af3d7403b74f91a7' ) {
                        let sum = o.cantidad * 12
                        estadistica.alitas12 = estadistica.alitas12 + sum
                        estadistica.total = estadistica.total + sum
                        // verificamos 18 alitas
                    } else if( o.producto_id._id.toString() === '5f519ab7af3d7403b74f91a8' ) {
                        let sum = o.cantidad * 18
                        estadistica.alitas18 = estadistica.alitas18 + sum
                        estadistica.total = estadistica.total + sum
                    } else if( o.producto_id._id.toString() === '5f519ac2af3d7403b74f91a9' ) {
                        let sum = o.cantidad * 24
                        estadistica.alitas24 = estadistica.alitas24 + sum
                        estadistica.total = estadistica.total + sum
                    }
                }
            })
        })


        res.status(200).send(estadistica)

    } catch (e) {
        res.status(400).send(e)
    }
}


module.exports = {
    alitas
}
