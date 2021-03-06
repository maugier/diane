var argv = require('minimist')(process.argv.slice(2));

if (argv.help) {
    process.stderr.write("Usage: node diane.js [--auth]\n    ----auth: turn on auth mode\n");
    process.exit(1);
}

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connection_count = 0;

var worldm = require('./world.js');
var world = worldm.create();

var running = undefined;

function tick() {
    worldm.tick(world);
    //io.emit('tick', world.time);  //Optimized mode
    io.emit('world', world);        // Compatible mode
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

app.get('/weapons', function(req,res) {
    res.sendFile(__dirname + "/weapons.html");
});

app.get('/world.js', function(req,res) {
    res.sendFile(__dirname + "/world.js");
});

app.use('/static', express.static(__dirname + "/static"));

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
    socket.on('chat', function(msg) {
        io.emit('chat', msg); 
    });

    socket.on('cmd', function(cmd) {
        worldm.execute(world, cmd);
    });

    socket.emit(running === undefined ? 'stop' : 'start');
    socket.emit('world', world);

});

http.listen(3000, function() {
    console.log("Listening on 3000");
});


