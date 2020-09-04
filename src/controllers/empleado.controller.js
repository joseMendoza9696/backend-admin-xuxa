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
    try {
        // buscamos un solo token ya que podemos tener varios
        req.empleado.tokens = req.empleado.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.empleado.save();

        res.send({ message: 'El usuario salio de su cuenta!' });
    } catch (error) {
        res.status(500).send();
    }
}

ventasFecha = async (req, res) => {

}

module.exports = {
    login,
    logout,
    ventasFecha
}
