const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
    descripcion: {
        type: String
    },
    producto_id: {
        type: String,
        required: true,
        trim: true
    },
    pedido_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Pedido'
    }
});

const Orden = mongoose.model('Orden', ordenSchema);
module.exports = Orden;
