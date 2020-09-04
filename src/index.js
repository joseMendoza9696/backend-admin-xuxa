const express = require('express');
const path = require('path');
const serveIndex = require('serve-index');
require('./db/mongoose');

const empleadoRouter = require('./routes/empleado');
const adminRouter = require('./routes/admin');

const pedidoRouter = require('./routes/pedido');
const productoRouter = require('./routes/producto');

const cors = require('cors');
const moment = require('moment');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// permite que podamos hacer peticiones desde otro server. siempre debe estar antes de las rutas
app.use(cors({ origin: 'http://localhost:4200' }));

app.use( '/admin', express.static('dist/dashboard-frontend'));
app.use( '/empl', express.static('dist/empleado-frontend'));

app.use(empleadoRouter);
app.use(adminRouter);
app.use(pedidoRouter);
app.use(productoRouter);


app.listen(port, () => {
    
    console.log(`El servidor esta escuchado en el puerto ${port}`);
});
