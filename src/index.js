const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io')
const { addEmployee, getEmployee, removeEmployee } = require('./utils/employees')

require('./db/mongoose');

const adminRouter = require('./routes/admin');

const empleadoRouter = require('./routes/empleado');
const pedidoRouter = require('./routes/pedido');
const productoRouter = require('./routes/producto');
const estadisticaRouter = require('./routes/estadisticas');

const cors = require('cors');
const app = express();
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000;

app.use(express.json());
// permite que podamos hacer peticiones desde otro server. siempre debe estar antes de las rutas
app.use(cors({ origin: '*' }));

// app.use( '/admin', express.static('dist/dashboard-frontend'));
app.use( '/empl', express.static('dist/empleado-frontend'));

app.use(empleadoRouter);
app.use(adminRouter);
app.use(pedidoRouter);
app.use(productoRouter);
app.use(estadisticaRouter);

io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const {error, employee} = addEmployee({
            id: socket.id,
            ...options
        })

        if (error){
            return callback(error)
        }

        socket.join(employee.room)

        // socket.emit('socketID', employee.id )

        callback()
    })

    socket.on('comanda',(callback) => {
        const employee = getEmployee(socket.id)

        // envia a todas las conexiones excepto al que esta enviando
        // socket.broadcast.to(employee.room).emit('recibirComanda')
        io.to(employee.room).emit('recibirComanda')

        callback()
    })

    socket.on('disconnect', () => {
        const employee = removeEmployee(socket.id);
        console.log(employee, ' salio de la sala')
    });
})

server.listen(port, () => {
    
    console.log(`El servidor esta escuchado en el puerto ${port}`);
});
