const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const empleadoSchema = new mongoose.Schema({
    correo: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('El email ingresado no es valido.');
            }
        }
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

});

empleadoSchema.statics.findCredentials = async (correo, password) => {

    const empleado = await Empleado.findOne({ correo });

    console.log(empleado);

    if (!empleado){
        throw new Error('Usuario inexistente');
    }

    if (empleado.password === password) {
        return empleado;
    }
    throw new Error('Credenciales incorrectas');
}

empleadoSchema.methods.generateAuthToken = async function() {
    const empleado = this;
    const token = jwt.sign( { _id: empleado._id.toString() }, process.env.EMPLOYEE_SECRET );

    empleado.tokens = empleado.tokens.concat({ token: token });
    await empleado.save();
    return token;
}

// empleadoSchema.pre('save', async function(next){
//     // verificar si el empleado ha sido creado
//     next();
// });

const Empleado = mongoose.model('Empleado', empleadoSchema);
module.exports = Empleado;
