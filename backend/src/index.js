const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const server = require('http').Server(app); // allows server work with HTTP
const io = require('socket.io')(server); // allows server work with websocket

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});


mongoose.connect('mongodb+srv://semana:semana@cluster0-rtelk.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

/* all requests after this middleware, can access IO */
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

app.use(cors());
app.use(express.json());

/* set files route default to get files */
// app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized' )));

app.use(routes);

server.listen(3333);
