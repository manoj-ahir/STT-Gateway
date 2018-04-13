var io = require("socket.io").listen(8080);

io.sockets.on("connection",function(socket){            
    socket.on("stream",function(data){        
        console.log(data)        
    });

    socket.on('end', function(){
        socket.emit('response', {from: 'some response'})
    })
    
});