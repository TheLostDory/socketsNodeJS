const mysql = require('mysql2');
const io = require("socket.io-client");
var socket = io.connect("http://localhost:3000");

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Tanouche1964',
    database:'testingsocket'
  });

tableName= 'test_socket';


async function addToTable(){
    let randXData= Math.floor(Math.random() * 40);
    data=[]
    for(let i = 0; i<40;i++){
        let randNumb= Math.floor(Math.random() * 400);
        data.push(randNumb);
    }
    ayre= JSON.stringify(data)
    await connection.promise().query(
    `UPDATE test_socket set data = '${ayre}'`,).then(results =>{
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
        console.log('bllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll');
        addToTable(socket);
    }, 2000)
    
}

addToTable()
