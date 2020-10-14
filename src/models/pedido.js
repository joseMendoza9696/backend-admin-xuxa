const mongoose = require('mongoose');
const https = require('https');

const Producto = require('../models/producto');

const pedidoSchema = new mongoose.Schema({
    nombre_cliente: {
        type: String, 
        required: true 
    },
    fecha_creacion: {
        type: String,
        required: true 
    },
    hora_creacion: {
      type: String,
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
                type: String,
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
    }
});

pedidoSchema.statics.agregarClima = async () => {
    const api_key = '3ea95b323ca21f1399996784116faef2';
    const city = 'Riberalta';
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?'
    let k = {};

    // return https.get(`${url}q=${city}&appid=${api_key}&lang=es&units=${units}`, async (res) => {
    //
    //     // console.log('1', k)
    //     await res.on('data', (d) => {
    //         d = d.toString();
    //         k = JSON.parse(d);
    //         // return clima;
    //     });
    //
    // });

    return https.get(`${url}q=${city}&appid=${api_key}&lang=es&units=${units}`);

    // await console.log('3',k)

    // return k;
}


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
