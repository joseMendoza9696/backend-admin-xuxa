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


// esto solo es para la tesis hay que eliminarlo despues o colocarlo en un repositorio
tesisWeb = async (req, res) => {
    try {
        res.status(200).send( 'Tu eres MR.ROBOTS - Que estas haciendo aqui? ' )
    } catch(error) {
        res.status(400).send(error)
    }
}

robots = async (req, res) => {
    try {
        res.status(200).send({ 'User-agent': '*', 'Disallow': '/59gt1' })
    } catch (error){
        res.status(400).send(error)
    }
}

flagRobots = async (req, res) => {
    try {
        res.status(200).send({ 'Flag': 'UCB{el_senor_robot}' })
    } catch (error){
        res.status(400).send(error)
    }
}

webDELETE = async (req, res) => {
    try {
        if ( req.method === 'GET' ) {
            // Creo que tu peticion es para eliminar algo!!, aqui no encontraras nada
            res.status(200)
                .send('Q3JlbyBxdWUgdHUgcGV0aWNpb24gZXMgcGFyYSBlbGltaW5hciBhbGdvISEsIGFxdWkgbm8gZW5jb250cmFyYXMgbmFkYQ==')
        } else if( req.method === 'DELETE' ){
            res.header('flag', 'UCB{always_watch_headers}')
            // Tu flag esta en las cabeceras de esta peticion
            res.status(200)
                .send('VHUgZmxhZyBlc3RhIGVuIGxhcyBjYWJlY2VyYXMgZGUgZXN0YSBwZXRpY2lvbg==')
        } else {
            // Aqui no esta lo que estas buscando
            res.status(200).send('QXF1aSBubyBlc3RhIGxvIHF1ZSBlc3RhcyBidXNjYW5kbw==')
        }
    } catch (error){
        res.status(400).send(error)
    }
}

module.exports = {
    login,
    logout,
    // es para la tesis
    tesisWeb,
    robots,
    flagRobots,
    webDELETE
}
