const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
});

categoriaSchema.virtual('Productos',{
    ref: 'Producto',
    localField: '_id',
    foreignField: 'categoria_id'
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = Categoria;
