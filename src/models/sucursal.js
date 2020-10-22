const mongoose = require('mongoose');

const sucursalSchema = new mongoose.Schema({
    ciudad: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
})

categoriaSchema.virtual('Empleados',{
    ref: 'Empleado',
    localField: '_id',
    foreignField: 'sucursal_id'
});

categoriaSchema.virtual('Pedidos', {
    ref: 'Pedido',
    localField: '_id',
    foreignField: 'sucursal_id'
})

const Sucursal = mongoose.model('Sucursal', sucursalSchema)
module.exports = Sucursal
