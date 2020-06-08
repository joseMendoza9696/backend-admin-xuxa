const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tamano_cantidad: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        validate(value){
            if ( value < 0 ) {
                throw new Error('El precio debe ser positivo');
            }
        }
    },
    tipo: {
        type: String,
        required: true
    }
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;