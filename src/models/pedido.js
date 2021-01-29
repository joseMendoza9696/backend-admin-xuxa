const mongoose = require('mongoose');
const https = require('https');

const Producto = require('../models/producto');

const pedidoSchema = new mongoose.Schema({
    nombre_cliente: {
        type: String, 
        required: true 
    },
    // fecha_creacion: {
    //     type: String,
    //     required: true
    // },
    // hora_creacion: {
    //   type: String,
    //   required: true
    // },
    fecha_creacion : {
        type: Date,
        required: true
    },
    nit_factura: {
        type: String,
    },
    nombre_factura: {
        type: String,
    },
    orden: [
        {
            producto_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            descripcion: {
                type: String
            },
            cantidad: {
                type: Number,
                default: 1
            }
        }
    ],
    cuenta_pedido: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Debe ser positivo');
            }
        }
    },
    tipo: {
        type: String,
        required: true,
        default: 'Llevar'
    },

    clima: {
        id_weather: {
            type: String,
        },
        description: {
            type: String,
        },
        temp: {
            type: Number
        },
        feels_like: {
            type: Number
        }
    },
    sucursal_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sucursal'
    },
    completado: {
        type: Boolean,
        default: false
    }
});


const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;
