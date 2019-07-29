const mongoose = require('mongoose');

const Pedido = mongoose.model('Pedido', {
    nombreCliente: { type: String, require: true },
    fechaHora: { type: Date, require: true },
    orden: [{ producto: { type: String, trim: true, require: true },
              tamano: { type: String },
              cantidad: { type: Number,
                          validate(value){
                              if (value < 0) {
                                  throw new Error('La cantidad debe ser positiva');
                              }
                          } },
              precio: { type: Number,  require: true,
                        validate(value) {
                            if (value < 0) {
                                throw new Error('El precio debe ser positivo');
                            }
                        } },
              descripcion: { type: String }
            }],
    nit: { type: String },
    nombre: { type: String },
    cuentaTotal: { type: Number,  require: true,
                   validate(value) {
                        if (value < 0) {
                            throw new Error('Resultado debe ser positivo');
                        }
                   }},
    estado: { type: Boolean, require: true }
});

module.exports = Pedido;