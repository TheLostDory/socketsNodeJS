const express = require('express');
const app = express();
const mysql = require('mysql2');
const http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('events');


const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Tanouche1964',
    database:'testingsocket'
  });

  async function addToTable(socket){
    let randXData= Math.floor(Math.random() * 100);
    tableName= 'test_socket'
    await connection.promise().query(
    `INSERT INTO ${tableName} (data) VALUES (${randXData}) `,).then(results =>{
        console.log('Affected Rows: ',results[0].affectedRows);
    })
    .catch(error =>{
        console.log('ERROR: ',error);
    })
                        
           flag = true;         
    io.sockets.emit(`test_socket_trigger`, {flag: flag});
    
    // emit(socket, tableName)
 
    console.log('################T1');
    setTimeout(function(){
        addToTable(socket);
    }, 5000)
    
}

http.listen(3000, () => {
    console.log('listening on :3000');
  });
