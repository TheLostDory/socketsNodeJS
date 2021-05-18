const express = require('express');
const app = express();
const mysql = require('mysql2');
const http = require('http').Server(app);
var io = require('socket.io')(http);
var etl = require('./etl.js');
const ioo = require("socket.io-client");

var sockettt = ioo.connect("http://localhost:3000");
tableName= 'test_socket';

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Tanouche1964',
    database:'testingsocket'
  });

  io.sockets.on('connection', function (socket){
        console.log('socket successfully connected');
        emit(socket,tableName);
        socket.on('t1_triggered', function (){
            console.log('nehna bi aleb l trigger');
            emit(socket,tableName);
        })
    })

async function emit(socket,tableName){
  console.log('ayreeeeeeeeeeeeeeeeeee');
      data =[]
      bhem = await connection.promise().query(
              `SELECT * FROM ${tableName}`,).then(results =>{
                  for( let i in results[0]){
                      data.push(results[0][i].data);
                  }
                  
                  newLength = data.length
                  return data
              })
              .catch(error =>{
                  console.log('ERROR: ',error);
              })
              dataa= JSON.parse(data)
              console.log('##### DATA: ',dataa);
      
      io.sockets.emit("line", {data: dataa});
      io.sockets.emit("bar", {data: dataa});
  }


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socket.html');
});
http.listen(3000, () => {
    console.log('listening on :3000');
  });