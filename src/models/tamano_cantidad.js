const mongoose = require('mongoose');

const tamanocantidadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    producto_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Producto'
    }
});

const Tamanocantidad = mongoose.model('Tamanocantidad', tamanocantidadSchema);
module.exports = Tamanocantidad;
