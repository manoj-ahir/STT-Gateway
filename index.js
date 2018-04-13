const app = require('http').createServer(handler)
const clientSocket = require('socket.io')(app);
const fs = require('fs');
var sttSocket = require("socket.io-client")('ws://localhost:8080'); //to connect to server2.js or change the url to STT Server 

sttSocket.on('connect', function () { });

app.listen(80);

function handler(req, res) {
  fs.readFile(__dirname + '/public/getAudio.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading getAudio.html');
      }
      res.writeHead(200);
      res.end(data);
    });
}

clientSocket.on('connection', function (socket) {
  socket.emit('open')

  socket.on('stream', function (data) {
    console.log(data);
    sttSocket.emit('stream', data);
  });

  socket.on('end', function () {
    console.log('recording stopped');    
    socket.emit('end', function(data){
      console.log(data);
    });
  });

});