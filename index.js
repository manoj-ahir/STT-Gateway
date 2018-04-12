const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

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

io.on('connection', function (socket) {
  socket.emit('open')

  socket.on('stream', function (data) {
    console.log('data');    
  });

  socket.on('end', function () {
    console.log('recording stopped');
  });

});