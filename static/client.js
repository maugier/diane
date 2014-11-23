var socket = io();

var world = undefined;

var shipname = window.location.search.substr(1);

function myShip() {
    return world.ships[shipname];
}

function setStatus(code, text) {
    switch(code) {
        case 0:
            $('#status').removeClass('nok').removeClass('warn').addClass('ok').text(text);        
            break;
        case 1:
            $('#status').removeClass('nok').removeClass('ok').addClass('warn').text(text);        
            break;
        case 2:
            $('#status').removeClass('ok').removeClass('warn').addClass('nok').text(text);        
            break;
    }
}

socket.on('disconnect', function() {
    setStatus(2, "Disconnected");
});

socket.on('stop', function() {
    setStatus(1, "Paused");
});

socket.on('start', function() {
    setStatus(0, "Running");
});

function setDraw(draw) {

    socket.on('world', function(w) {
        world = w;
        draw(w);
    });


    socket.on('tick', function(time) {
        tick(world);
        draw(world);
    });

}
            
function shipCommand(cmd) {
    socket.emit('cmd', {ship: shipname, cmd: cmd}); 
}
