var app = require('express')()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connection_count = 0;

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/status.html")
});

app.get('/diane.css', function(req,res) {
    res.sendFile(__dirname + "/diane.css");
});

// Global socket
io.on('connection', function(socket){
    console.log("New connection")
    connection_count++;
    io.emit('cc', connection_count);
    socket.on('disconnect', function() {
        connection_count--;
        io.emit('cc', connection_count);
    });
});

http.listen(3000, function() {
    console.log("Listening on 3000");
});


