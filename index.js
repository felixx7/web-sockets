var express = require('express');
var socket = require('socket.io');

//App Setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to request on port 4000');
});

// Static File
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection',socket.id);
    socket.on('chat',function(data){
        //broadcast to all client
        io.sockets.emit('chat',data);
        //to client
        // socket.sockets.emit('')
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data);
    });
});

