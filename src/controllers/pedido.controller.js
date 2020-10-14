const Pedido = require('../models/pedido');
const Producto = require('../models/producto');

const https = require('https');

crearPedido = async (req, res) => { // /emp/pedido/nuevo
    const pedido = new Pedido(req.body);

    const api_key = '3ea95b323ca21f1399996784116faef2';
    const city = 'Riberalta';
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?'

    try{
        // await Pedido.agregarClima();
        // await pedido.save();
        await https.get(`${url}q=${city}&appid=${api_key}&lang=es&units=${units}`, async (res) => {
            res.on('data', (d) => {
                d = d.toString()
                let weather = JSON.parse(d)

                // TODO: fix this
                pedido.clima.id_weather = weather.weather[0].id
                pedido.clima.description = weather.weather[0].description
                pedido.clima.temp = weather.main.temp
                pedido.clima.temp = weather.main.feels_like
            })
        })

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


module.exports = {
    crearPedido,
    listarPedido,
    listarPedidosFecha,
    listarPrecioPedidoFecha,
    buscarCliente
}
