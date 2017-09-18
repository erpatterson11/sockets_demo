var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname));

io.on('connection', function(socket) {
  socket.on('chat message', function(msg, user) {
    console.log(msg);
    io.emit('chat message', msg, user);
  });
  socket.on('disconnect', function() {
    io.emit('user disconnected', { msg: 'user disconnected' });
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
