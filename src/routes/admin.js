const express = require('express');
const moment = require('moment');
const router = new express.Router();

const adminAuth = require('../middleware/adminAuth');

const Admin = require('../models/admin');
const Empleado = require('../models/empleado');
const Pedido = require('../models/pedido');
const Producto = require('../models/producto');

// TODO: ADMIN
router.post('/admin/nuevo', async(req, res) => {
    const admin = new Admin(req.body);

    try {
        await admin.save();
        const token = await admin.generateAuthToken();

        res.status(201).send({ message: 'Administrador creado', token });

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/admin/login', async(req, res) => {
    
    try {
        const admin = await Admin.findCredentials( req.body.correo, req.body.password );
        const token = await admin.generateAuthToken();

        res.status(200).send({ admin, token });    
    } catch (error) {
        res.status(400).send(error);
    }
});

// TODO: EMPLEADOS
router.post('/admin/crear-empleado', adminAuth ,async(req, res) => {
    const empleado = new Empleado(req.body);

    try {
        await empleado.save();
        res.status(201).send({ empleado, message: 'Empleado creado' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/admin/empleado/:id', adminAuth ,async(req, res) => {
    const idEmpleado = req.params.id;

    try {
        const empleado = await Empleado.findOne({ _id: idEmpleado });

        if (!empleado) {
            return res.status(401).send('Empleado no encontrado');
        }

        res.status(200).send(empleado);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/admin/empleados', adminAuth , async(req, res) => {
    try {
        const empleados = await Empleado.find();

        if (!empleados) {
            return res.status(401).send({ message: 'No hay empleados registrados' });
        }

        res.status(200).send(empleados);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/admin/empleado/:id', adminAuth ,async(req, res) => {
    const idEmpleado = req.params.id;

    try {
        const empleadoEliminado = await Empleado.findOneAndDelete({_id: idEmpleado});

        if (!empleadoEliminado) {
            return res.status(401).send({ error: 'Empleado no encontrado' });
        } 

        res.status(200).send({ message: 'Empleado eliminado' });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.patch('/admin/empleado/:id', adminAuth ,async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['correo', 'nombre', 'cargo', 'password'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send( {error: 'Actualizaciones invalidas!'} )
    }

    try {        
        const empleado = await Empleado.findOne({ _id: req.params.id });

        if (!empleado) {
            return res.status(404).send({ error: 'Empleado no encontrado' });
        }

        updates.forEach((update) => {
            empleado[update] = req.body[update];
        });
        await empleado.save();

        res.send(empleado);
    
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

});

// TODO: PEDIDOS
router.get('/admin/pedido/:id', adminAuth ,async(req, res) => {
    const idPedido = req.params.id;
    
    try {
        const pedido = await Pedido.findOne({ _id: idPedido });

        if (!pedido) {
            res.status(401).send('No existe ese pedido');
        }

        res.status(200).send(pedido);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/admin/pedidos', adminAuth ,async(req, res) => {
    try {
        const pedidos = await Pedido.find();

        if (!pedidos) {
            res.status(401).send('No hay pedidos hechos.');
        }

        res.status(200).send(pedidos);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/admin/pedidos/fecha', adminAuth ,async(req, res) => {
    const fecha = req.body.fecha;

    try {
        const pedidos = await Pedido.find({ creacionFecha: fecha });

        res.status(200).send(pedidos);
    } catch (error) {
        res.status(400).send(error);
    }
});

// TODO: PRODUCTO

router.post('/admin/producto-nuevo', adminAuth, async (req, res) => {
    const producto = new Producto(req.body);

    try {
        await producto.save();
        res.status(201).send(producto);
    } catch (error) {
        res.status(400).send( error );
    }
});

router.get('/admin/producto/:id', adminAuth, async (req, res) => {
    const idProducto = req.params.id;

    try {
        const producto = await Producto.findOne({ _id: idProducto });

        res.status(200).send(producto);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/admin/productos', adminAuth, async (req, res) => {
    try {
        const productos = await Producto.find();

        res.status(200).send(productos);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/admin/producto/:id', adminAuth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nombre', 'tamano_cantidad', 'precio', 'tipo'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send( {error: 'Actualizaciones invalidas!'} )
    }

    try {        
        const producto = await Producto.findOne({ _id: req.params.id });

        if (!producto) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }

        updates.forEach((update) => {
            producto[update] = req.body[update];
        });
        await producto.save();

        res.send(producto);
    
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/admin/producto/:id', adminAuth, async (req, res) => {
    const idProducto = req.params.id;

    try {
        const producto = await Producto.findOneAndDelete({_id: idProducto });

        if (!Producto) {
            return res.status(401).send({ error: 'Producto no encontrado' });
        } 

        res.status(200).send({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;