// define module constructor that accepts the io variable
var io = require('socket.io')();
module.exports = function(importIO) {
    io = importIO;
}
console.log('ayreeeeeeeeeee');
// elsewhere in the module
io.emit('bhem')