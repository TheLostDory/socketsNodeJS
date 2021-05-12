var express = require('express');
var app = express();
var server = app.listen(8080);
var io = require('socket.io')(server);

// load msg module and give it the io variable
var msg = require('./msg.js')(io);

io.sockets.on('bhem', function (){
    console.log('bhem was triggered');
})