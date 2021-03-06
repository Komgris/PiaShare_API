const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post');
const sharedRoute = require('./routes/shared');
const profileRoute = require('./routes/profile');
const cors = require('cors');
const socketio = require('socket.io')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true },() => 
    console.log('connect db')
);

//Middleware
app.use(cors())
app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)
app.use('/api/shared', sharedRoute)
app.use('/api/profile', profileRoute)

const server = app.listen(4200, () => console.log('Server Run'));

const io = socketio.listen(server);

io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on('disconnect', () =>
       console.log(`Disconnected: ${socket.id}`));
       
    socket.on('join', (room) => {
       console.log(`Socket ${socket.id} joining ${room}`);
       socket.join(room);
    });
    socket.on('chat', (data) => {
       const { message, room } = data;
       console.log(`msg: ${message}, room: ${room}`);
       io.to(room).emit('chat', message);
    });
 });

