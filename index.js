var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
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
    
  socket.emit('open', { hello: 'world' });
  socket.on('stream', function (data) {
    console.log(data);

  });
  socket.on('end', function(){
    console.log('recording stopped');
  });
});