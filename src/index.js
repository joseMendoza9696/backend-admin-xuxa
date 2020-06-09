const express = require('express');
require('./db/mongoose');

const empleadoRouter = require('./routes/empleado');
const adminRouter = require('./routes/admin');

// const cors = require('cors');
const moment = require('moment');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// permite que podamos hacer peticiones desde otro server. siempre debe estar antes de las rutas
// app.use(cors({ origin: 'http://localhost:4200' }));

app.use( express.static('dashboard-frontend') );

app.use(empleadoRouter);
app.use(adminRouter);


app.listen(port, () => {
    
    console.log(`El servidor esta escuchado en el puerto ${port}`);
});
