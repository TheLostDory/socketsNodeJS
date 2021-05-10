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
    data=[]
    headersArray = [];
    bodyArray = [];
    headers = await connection.promise().query(
        'SHOW COLUMNS FROM trend_data',).then(results =>{
            for( let i in results[0]){
                headersArray.push(results[0][i].Field);
            }
        })
        .catch(error =>{
            console.log('ERROR: ',error);
        })
    console.log('### HEADERS: ', headersArray);
    for(let i = 0 ; i<headersArray.length;i++){

        connection.promise().query(
        `SELECT ${headersArray[i]} FROM trend_data`,).then(results =>{
    bodyBhem= results[0];
    console.log(bodyBhem);

            // for( let i in results[0]){
            //     bodyArray.push(results[0][i].Field);
            // }
        })
        .catch(error =>{
            console.log('ERROR: ',error);
        })
    }


    //  bhem = await connection.promise().query(
    //     'SELECT * FROM trend_data',).then(results =>{
    //         for( let i in results[0]){
    //             r1.push(results[0][i].room1)
    //             r2.push(results[0][i].room2)
    //             r3.push(results[0][i].room3)
    //         }
            
    //         newLength = r1.length
    //         return r1
    //     })
    //     .catch(error =>{
    //         console.log('ERROR: ',error);
    //     })

    // if(newLength> oldLength){
    //     room1 = []; 
    //     room2 = []; 
    //     room3 = []; 
    //     for (let i =oldLength; i<newLength; i++){
    //         room1.push(r1[i])
    //         room2.push(r2[i])
    //         room3.push(r3[i])
    //     }
    //     console.log('DATAAAAA1: ',room1);
    //     console.log('DATAAAAA2: ',room2);
    //     console.log('DATAAAAA3: ',room3);
    //     for(let i = 0; i< socketId.length; i++){

    //         socket.emit(socketId[i], {data: socketId[i]})
    //     }
        // socket.emit('room2', {room2: data2})
        // socket.emit('room3', {room3: data3})
        oldLength = newLength;
    // }
    // updateSeries(socket)
    // setTimeout(updateSeries(socket), 3000);
}

http.listen(3000, () => {
  console.log('listening on :3000');
});