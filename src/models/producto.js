const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
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
    categoria_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Categoria'
    }
});

productoSchema.virtual('Tamanocantidads',{
    ref: 'Tamanocantidad',
    localField: '_id',
    foreignField: 'producto_id'
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
