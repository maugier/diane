var socket = io();

var world = undefined;

socket.on('world', function(w) {
    world = w;
    draw(w);
});

socket.on('tick', function(time) {
    tick(world);
    draw(world);
}
            
