const express = require('express');
const app = express();
const mysql = require('mysql2');
const http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('events');
activeIds= [1,2,3];

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Tanouche1964',
    database:'testingsocket'
  });

  io.sockets.on("test_socket_trigger", function(){
    console.log('############################# TRIGGERRRRRRRRRRRRR');
    for(let i = 0; i<activeIds.length;i++){
        emit(activeIds[i])
    }
});

  io.sockets.on('connection', function (socket){
      console.log('b aleb l connection');
    // socket.emit("ayre", {data: true});
    socket.on("test_socket_trigger", function(){
        console.log('############################# TRIGGERRRRRRRRRRRRR');
        for(let i = 0; i<activeIds.length;i++){
            emit(activeIds[i])
        }
    });
    socket.on('error', function (err) {
        console.log(err);
    });
    // socket.emit("ayre", {data: true});
})

addToTable()

async function emit(id){
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
        socket.on("ayre", function(dataa){
            console.log('ANA B ALEB L EMIT AYRE');
        })
        socket.emit(`${id}`, {data: data});
    }

function addToTable(){
    let randXData = Math.floor(Math.random() * 100);
    tableName = 'test_socket'
    connection.promise().query(
    `INSERT INTO ${tableName} (data) VALUES (${randXData}) `,).then(results =>{
        console.log('Affected Rows: ',results[0].affectedRows);
        
    io.sockets.emit(`test_socket_trigger`, {});
    // emit(socket, tableName)
    
    console.log('################T1');
    setTimeout(function(){
        addToTable();
    }, 5000)
    }).catch(error =>{
        console.log('ERROR: ',error);
    });

    
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socket.html');
  });

http.listen(3000, () => {
    console.log('listening on :3000');
  });

