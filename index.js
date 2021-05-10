const express = require('express');
const app = express();
const mysql = require('mysql2');
const http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
var socketId =['room1','room2','room3']

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Tanouche1964',
    database:'testingsocket'
  });

  

io.sockets.on('connection', function (socket){
    updateSeries(socket);
})

var oldLength = 0;
var newLength = 0;


async function updateSeries(socket){
    let array=[];
     bhem = await connection.promise().query(
        'SELECT * FROM trend_data',).then(results =>{
            for( let i in results[0]){
                array.push(results[0][i].room1)
            }
            newLength = array.length
            return array
        })
        .catch(error =>{
            console.log('ERROR: ',error);
        })

    if(newLength> oldLength){
        data = []; 
        for (let i =oldLength; i<newLength; i++){
            data.push(array[i])
        }
        console.log('DATAAAAA: ',data);
        
        socket.emit('room1', {room1: data})
        oldLength = newLength;
    }
    updateSeries(socket)
}

http.listen(3000, () => {
  console.log('listening on :3000');
});