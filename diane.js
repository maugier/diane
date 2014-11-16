var app = require('express')()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connection_count = 0;

var world = require('./world.js').create();

var running = undefined;


function tick() {
    world.tick();
    console.log("tick " + world.time);
    io.emit('tick', world.time);
}

function start() {
    if (running === undefined) {
        console.log("Starting simulation");
        running = setInterval(tick, 100);
        io.emit('start', {});
    }
}

function stop() {
    if (running !== undefined) {
        clearInterval(running);
        running = undefined;
        console.log("Simulation stopped");
        io.emit('stop', {});
    }
}

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/status.html");
});

app.get('/helm', function(req,res) {
    res.sendFile(__dirname + "/helm.html"); 
});

app.get('/diane.css', function(req,res) {
    res.sendFile(__dirname + "/diane.css");
});

app.get('/draw.js', function(req,res) {
    res.sendFile(__dirname + "/draw.js");
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

    socket.on('start', start);
    socket.on('stop', stop);

    socket.emit(running === undefined ? 'stop' : 'start');

});

http.listen(3000, function() {
    console.log("Listening on 3000");
});


