const mongoose = require('mongoose');

const Pedido = mongoose.model('Pedido', {
    nombreCliente: { type: String, required: true },
    fechaHora: { type: Date, required: true },
    orden: [{ producto: { type: String, required: true, trim: true },
              tamano: { type: String, required: true },
              cantidad: { type: Number, required: true,
                          validate(value){
                              if (value < 0) {
                                  throw new Error('La cantidad debe ser positiva');
                              }
                          } },
              precio: { type: Number, required: true,
                        validate(value) {
                            if (value < 0) {
                                throw new Error('El precio debe ser positivo');
                            }
                        } },
              descripcion: { type: String }
            }],
    nit: { type: String },
    nombre: { type: String },
    cuentaTotal: { type: Number, required: true,
                   validate(value) {
                        if (value < 0) {
                            throw new Error('Resultado debe ser positivo');
                        }
                   }},
    estado: { type: Boolean, required: true }
});

module.exports = Pedido;