const express = require('express');
const app = express();
const mysql = require('mysql2');
const http = require('http').Server(app);
var io = require('socket.io')(http);


function init(){
    players = [];

    socket = io.listen(8000);

    // setEventHandlers();

};
init();

socket.on("main", function(data){
    console.log('##################### DATA')
})

http.listen(3000, () => {
    console.log('listening on :3000');
  });