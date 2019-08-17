const express = require('express');
const router = new express.Router();
const Pedido = require('../models/pedido');

const hoy = new Date();

// devuelve las comandas del dia de hoy
router.get('/', async(req,res) => {
    const ano = hoy.getFullYear();
    const mes = hoy.getMonth();
    const dia = hoy.getDate();
    const hoy2 = new Date(ano,mes,dia,0,0,0);
    try {
        const pedidos = await Pedido.find({ fechaHora: { $gte: hoy2 } });
        res.send(pedidos);
    } catch (error) {
        res.status(400).send(error);
    }
    
});
// busca por id y devuelve un pedido
router.get('/pedido/:id', async (req,res) => {
    try {
        const _id = req.params.id;
        const pedido = await Pedido.findById( _id ); 

        res.send(pedido);
    } catch (error) {
        res.status(400).send(error);
    }
});


// recibe el post de nuevos pedidos
router.post('/nuevo',async(req,res) => {
    const pedido = new Pedido(req.body);
    try {
        await pedido.save();
        res.status(201).send(pedido);
    } catch (error) {
        res.status(400).send(error);
    }
});
// recibe la actualizacion del estado de un pedido
router.patch('/:id', async (req,res) => {
    const updates = Object.keys(req.body);
    // solo permitira que actualicemos el estado
    const allowedUpdates = ['estado'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try {
        const _id = req.params.id;
        const pedidos = await Pedido.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
    
        if (!pedidos) {
            return res.status(404).send();
        }
        res.send(pedidos);
    
    } catch (error) {
        res.status(400).send(error);
    }

});

// router.get('/nuevo/:id', async(req,res) => {
//     const _id = req.params.id; 
//     const pedido = await Pedido.findById( _id );
    
//     try {
//         if (!pedido) {
//             return res.status(404).send();
//         }
//         res.send(pedido);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// router.get('/resumen-dia', async(req,res) => {
//     const ano = hoy.getFullYear();
//     const mes = hoy.getMonth();
//     const dia = hoy.getDate();
//     const hoy2 = new Date(2019,6,4,0,0,0);
//     const hoy3 = new Date(2019,6,4,23,59,59);
//     try {
//         const pedidos = await Pedido.find( {fechaHora: { $gte:hoy2, $lte: hoy3 }}  );
//         if (!pedidos) {
//             return res.status(404).send({ mensaje: 'No hay nada para mostrar' });
//         }
//         res.send(pedidos);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// router.get('/resumen-dia/:dia', async(req,res) => {
//     const dia = new Date(req.params.dia);
//     const ano = dia.getFullYear();
//     const mes = dia.getMonth();
//     const day = dia.getDate();
//     const hoy2 = new Date(ano,mes,day,0,0,0);
//     const hoy3 = new Date(ano,mes,day,23,59,59);

//     try {
//         const pedidos = await Pedido.find({fechaHora: { $gte:hoy2, $lte: hoy3 }});
//         if (!pedidos) {
//             return res.status(404).send({mensaje: 'No hay nada para mostrar'});
//         }
//         res.send(pedidos);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// router.get('/resumen-dia/:dia/:producto', async(req,res) => {
//     const dia = new Date(req.params.dia);
//     const ano = dia.getFullYear();
//     const mes = dia.getMonth();
//     const day = dia.getDate();
//     const hoy2 = new Date(ano,mes,day,0,0,0);
//     const hoy3 = new Date(ano,mes,day,23,59,59);
    
//     const producto = req.params.producto;
//     try {
//         const pedidosProducto = await Pedido.find( { 'orden.producto': producto , fechaHora: { $gte:hoy2, $lte: hoy3 }});
//         if (!pedidosProducto) {
//             return res.status(404).send({mensaje: 'No hay nada para mostrar'});
//         }
//         res.send(pedidosProducto);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// router.get('/resumen-dia/:producto', async(req,res) => {
//     const producto = req.params.producto;
//     try {
//         const pedidosProducto = await Pedido.find( { 'orden.producto': producto , fechaHora: { $gte:hoy2, $lte: hoy3 }});
//         if (!pedidosProducto) {
//             return res.status(404).send({mensaje: 'No hay nada para mostrar'});
//         }
//         res.send(pedidosProducto);
//     } catch (error) {
//         res.send(error);
//     }
// });

// router.get('/resumen-total', async(req,res) => {
//     const pedidos = await Pedido.find({});
//     if (!pedidos) {
//         return res.status(204).send();
//     }
//     res.send(pedidos);
// });




module.exports = router;

