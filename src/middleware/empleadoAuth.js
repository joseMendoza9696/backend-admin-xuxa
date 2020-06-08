const jwt = require('jsonwebtoken');

const Empleado = require('../models/empleado');

const empleadoAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify( token, process.env.EMPLOYEE_SECRET );
        const empleado = await Empleado.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!empleado) {
            throw new Error();
        }

        req.token = token;
        req.empleado = empleado;
        next();

    } catch (error) {
        res.status(400).send({ error:'Please authenticate!' });
    }
}

module.exports = empleadoAuth;