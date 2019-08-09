const express = require('express');
require('./db/mongoose');
const pedidoRouter = require('./routers/pedidos');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// permite que podamos hacer peticiones desde otro server. siempre debe estar antes de las rutas
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(pedidoRouter);




app.listen(port, () => {
    console.log(`El servidor esta escuchado en el puerto ${port}`);
});
