const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    password: {
        type: String,
        required: true,
        minlength: 7
    }
});

adminSchema.statics.findCredentials = async (correo, password) => {
    const admin = await Admin.findOne({ correo });
    if (!admin) {
        throw new Error('Aun no te has registrado!');
    }
    const isMatch = await bcrypt.compare( password, admin.password );

    if (!isMatch) {
        throw new Error('Aun no te has registrado!');
    }
    return admin;
};

// generamos un token para el administrador
adminSchema.methods.generateAuthToken = async function() {
    const admin = this;
    const token = jwt.sign( { _id: admin._id.toString() }, process.env.ADMIN_SECRET );

    admin.tokens = admin.tokens.concat({ token: token });
    await admin.save();
    return token;
}

adminSchema.pre('save', async function(next){
    const admin = this;

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;