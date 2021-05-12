const express = require('express');
const app = express();
const mysql = require('mysql2');
const http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('events');
var socketIo = require('socket.io')

exports.register = (server, options) => {
  var io = socketIo(server.listener);

  return onConnect => {
    io.on('connection', onConnect);
  };
};

const myConnection = register(myServer);

tableName= 'test_socket'

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Tanouche1964',
    database:'testingsocket'
  });


//   io.sockets.on('connection', function (socket){
//     console.log('b aleb l emit l a7be');
//     emit(socket,tableName)
// })



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
        console.log('##### DATA: ',data);
        
        myConnection.emit("trigger", {data: data});
    }

    async function addToTable(){
        let randXData= Math.floor(Math.random() * 100);
        tableName= 'test_socket'
        await connection.promise().query(
        `INSERT INTO ${tableName} (data) VALUES (${randXData}) `,).then(results =>{
            console.log('Affected Rows: ',results[0].affectedRows);
        })
        .catch(error =>{
            console.log('ERROR: ',error);
        })
                            
        emit(socket, tableName)
     
        console.log('################T1');
        setTimeout(function(){
            addToTable(socket);
        }, 5000)
        
    }
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socket.html');
  });

// emit('test_socket')
// addToTable()
http.listen(3000, () => {
    console.log('listening on :3000');
  });

