const mongoose = require('mongoose');

const Producto = require('../models/producto');

const pedidoSchema = new mongoose.Schema({
    nombre_cliente: {
        type: String, 
        required: true 
    },
    fecha_creacion: {
        type: Date,
        required: true 
    },
    nit_factura: {
        type: String,
    },
    nombre_factura: {
        type: String,
    },
    cuenta_pedido: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Debe ser positivo');
            }
        }
    },

});

userSchema.virtual('ordens',{
    ref: 'Orden',
    localField: '_id',
    foreignField: 'pedido_id'
});

// pedidoSchema.statics.precioTotal = async ( ordenes ) => {
//     var precio = 0;
//
//     for (let i = 0; i < ordenes.length; i++) {
//         const producto = await Producto.findById(ordenes[i].id_producto);
//         precio = precio + (ordenes[i].cantidad * producto.precio);
//     }
//
//     return precio;
// }

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;
