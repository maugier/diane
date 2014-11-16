var canvas = document.getElementById('radar');
var ctx = canvas.getContext('2d');

var zoom = 0;
var zoom_factors = [50, 100, 200];

var shipname = "Artemis";

function largeError(label) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillText(label, 0, 0);
}

function draw(world) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
    
socket.on('disconnect', function() {
    largeError("Disconnected");
});

socket.on('stop', function() {
    largeError("Paused");
});
