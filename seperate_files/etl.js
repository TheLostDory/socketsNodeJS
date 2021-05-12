const express = require('express');
const app = express();
const mysql = require('mysql2');
const http = require('http').Server(app);
var io = require('socket.io')(http);

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Tanouche1964',
    database:'testingsocket'
  });

tableName= 'test_socket';


io.sockets.on('connection', function (socket){
    console.log('etl connected');
    addToTable(socket)
})

async function addToTable(socket){
    let randXData= Math.floor(Math.random() * 100);
    await connection.promise().query(
    `INSERT INTO ${tableName} (data) VALUES (${randXData}) `,).then(results =>{
        console.log('Affected Rows: ',results[0].affectedRows);
    })
    .catch(error =>{
        console.log('ERROR: ',error);
    })
    socket.emit('t1_triggered', function () {
        console.log('emitting to front end etl');
    });
                        
    console.log('################T1');
    setTimeout(function(){
        addToTable(socket);
    }, 5000)
    
}




//   module.exports = function(getIOInstance){
   
//         menuModel.addMenu(req.body,function(data){
//             //I WANT EMIT HERE
//             getIOInstance().sockets.emit()
//             res.json(data)
//         });
//     return router;
//   }

http.listen(3100, () => {
    console.log('listening on :3100');
  });