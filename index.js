const express = require('express');
const app = express();
const mysql = require('mysql2');
const http = require('http').Server(app);
var io = require('socket.io')(http);



// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// var socketId =['room1','room2','room3']

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Tanouche1964',
    database:'testingsocket'
  });

  

io.sockets.on('connection', function (socket){console.log('ayreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    addToTables()
    // updateSeries(socket);
})
tables=['table_1','table_2']
var oldLength = 0;
var newLength = 0;

async function addToTables(){
    await addToTable1().then(
    ).catch(
    );
    
    await addToTable2().then().catch();
    addToTables();
}
async function selectFromTables(tableName){
    connection.promise().query(
        `SELECT * FROM ${tableName}`,).then(results =>{
            console.log(results[0]);
    // bodyBhem= results[0][headersArray[i]];
    // console.log(bodyBhem);

            // for( let i in results[0]){
            //     bodyArray.push(results[0][i].Field);
            // }
        })
        .catch(error =>{
            console.log('ERROR: ',error);
        })
}
async function addToTable1(){
    let randXData= Math.floor(Math.random() * 100);
    let randYData= Math.floor(Math.random() * 100);
    await connection.promise().query(
    `INSERT INTO ${tables[0]} (xData,yData)  VALUES (${randXData}, ${randYData}) `,).then(results =>{
        console.log('Affected Rows: ',results[0].affectedRows);
    })
    .catch(error =>{
        console.log('ERROR: ',error);
    })
    console.log('################T1');
     selectFromTables(tables[0])
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                if (resolve) {
                    resolve({msg: 'It works', data: 'some data'});
                } else {
                    // If promise can not be fulfilled due to some errors like network failure
                    reject(new Error({msg: 'It does not work'}));
                }
            }, 5000);
    });
   

}
async function addToTable2(){
    let randXData= Math.floor(Math.random() * 100);
    let randYData= Math.floor(Math.random() * 100);
    await connection.promise().query(
    `INSERT INTO ${tables[1]} (xData2,yData2)  VALUES (${randXData}, ${randYData}) `,).then(results =>{
        console.log('Affected Rows: ',results[0].affectedRows);
    })
    .catch(error =>{
        console.log('ERROR: ',error);
    })
    console.log('################T2');

    selectFromTables(tables[1])
    
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                if (resolve) {
                    resolve({msg: 'It works', data: 'some data'});
                } else {
                    // If promise can not be fulfilled due to some errors like network failure
                    reject(new Error({msg: 'It does not work'}));
                }
            }, 7000);
        });
}



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
            console.log(results[0]);
    // bodyBhem= results[0][headersArray[i]];
    // console.log(bodyBhem);

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