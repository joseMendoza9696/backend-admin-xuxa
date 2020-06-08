const express = require('express');
const router = new express.Router();
const moment = require('moment');
moment.locale('es');

const empleadoAuth = require('../middleware/empleadoAuth');

const Pedido = require('../models/pedido');
const Empleado = require('../models/empleado');
const Producto = require('../models/producto');

router.post('/emp/login', async (req, res) => {

    try {
        const empleado = await Empleado.findCredentials( req.body.correo, req.body.password );
        const token = await empleado.generateAuthToken();

        res.status(200).send({ empleado, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// TODO: PEDIDOS

router.post('/emp/pedido/nuevo', empleadoAuth, async (req, res) => {
    let fecha = new Date();
    let fechaCreacion = moment(fecha);
    fechaCreacion = fechaCreacion.format('YYYY-MM-DD');

    let hora= moment(fecha);
    let horaCreacion = hora.format('HH:mm a');


    try {
        const pedido = req.body;
        const precioTotal = await Pedido.precioTotal(pedido.orden); 
        const p = {
            nombreCliente: pedido.nombreCliente,
            creacionFecha: fechaCreacion,
            creacionHora: horaCreacion,
            orden: pedido.orden,
            cuentaTotal: precioTotal,
            nit: pedido.nit,
            nombre: pedido.nombre
        }
        const pp = new Pedido(p);

        await pp.save();
        res.status(201).send({ message: 'Pedido creado' });
        // res.send('listo');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/emp/pedido/:id', empleadoAuth, async (req, res) => {
    const pedidoID = req.params.id;
    try {
        const pedido = await Pedido.findById( pedidoID );

        res.status(200).send(pedido);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/emp/pedidos/:myID', empleadoAuth, async (req, res) => {
    const idEmpleado = req.params.myID;

    try {
        const pedidos = await Pedido.find({ completado_por: idEmpleado });

        res.status(200).send(pedidos);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/emp/pedido/:id/:myID', empleadoAuth, async (req, res) => {

    const idEmpleado = req.params.myID;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['estado'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send( {error: 'Actualizaciones invalidas!'} )
    }

    try {        
        const pedido = await Pedido.findOne({ _id: req.params.id });

        if (!pedido) {
            return res.status(404).send({ error: 'Pedido no encontrado' });
        }

        let fecha = new Date();
        let fechaCompletado = moment(fecha);
        fechaCompletado = fechaCompletado.format('YYYY-MM-DD');

        let hora = moment(fecha);
        let horaCompletado = hora.format('HH:mm a');

        pedido['completado_por'] = idEmpleado;
        pedido['completadoFecha'] = fechaCompletado;
        pedido['completadoHora'] = horaCompletado;
        pedido['estado'] = true;

        await pedido.save();
        res.send(pedido);
    
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post('/empleado/pedidos/fecha', empleadoAuth, async(req, res) => {
    const fecha = req.body.fecha;

    try {
        const pedidos = await Pedido.find({ creacionFecha: fecha });

        res.status(200).send(pedidos);
    } catch (error) {
        res.status(400).send(error);
    }
});

// TODO: PRODUCTOS

router.get('/emp/productos', empleadoAuth, async(req, res) => {
    try {
        const productos = await Producto.find();

        res.status(200).send(productos);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/emp/producto/:id', empleadoAuth, async(req, res) => {
    const id = req.params.id;

    try {
        const pedido = await Producto.findById(id);

        res.status(200).send(pedido);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.get('/emp/productos/:tipo', empleadoAuth, async(req, res) => {
    const tipo = req.params.tipo;

    try {
        const productos = await Producto.find({ tipo: tipo });

        res.status(200).send(productos);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;

