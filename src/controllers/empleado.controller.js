const Empleado = require('../models/empleado');

login = async (req, res) => {
    try {
        const empleado = await Empleado.findCredentials( req.body.correo, req.body.password );
        const token = await empleado.generateAuthToken();

        res.status(200).send({ empleado, token });
    } catch (error) {
        res.status(400).send(error);
    }
}

logout = async (req, res) => {

}

ventasFecha = async (req, res) => {

}

module.exports = {
    login,
    logout,
    ventasFecha
}
