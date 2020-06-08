const mongoose = require('mongoose');

const Producto = require('../models/producto');

const pedidoSchema = new mongoose.Schema({
    nombreCliente: { 
        type: String, 
        required: true 
    },
    // fecha y hora de creacion
    creacionFecha: { 
        type: String,
        required: true 
    },
    creacionHora: {
        type: String,
        required: true
    },
    // fecha y hora cuando el pedido se ha completado
    completadoFecha: {
        type: String,
    },
    completadoHora: {
        type: String
    },
    // id del empleado que completo el pedido
    completado_por: {
        type: String
    },
    orden:[{
        id_producto: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            validate(value){
                if ( value < 0 ) {
                    throw new Error('La cantidad debe ser positiva');
                }
            },
            default: 1
        },
        descripcion: {
            type: String
        }
    }],
    nit: { 
        type: String 
    },
    nombre: { 
        type: String 
    },
    cuentaTotal: { 
        type: Number, 
        required: true, 
        validate(value) {
            if (value < 0) {
                throw new Error('Resultado debe ser positivo');
            }
        }
    },
    estado: {
        type: Boolean, 
        default: false
    }
});

pedidoSchema.statics.precioTotal = async ( ordenes ) => {
    var precio = 0;

    for (let i = 0; i < ordenes.length; i++) {
        const producto = await Producto.findById(ordenes[i].id_producto);
        precio = precio + (ordenes[i].cantidad * producto.precio);
    }

    return precio;
}

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;