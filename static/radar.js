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

    var me = world.ships[shipname];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    var z = canvas.height / zoom_factors[zoom];
    ctx.scale(z,z);

    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    for (var r in [10,20,50,100,200,500]) {
        ctx.beginPath();
        ctx.arc(0,0,r,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fillText(r, 0, -r);
    }

    ctx.translate(-me.x, -me.y);

    for (var sn in world.ships) {
        ship = world.ships[sn];
        drawship(ctx, ship);
    }

    ctx.restore();
}
    
socket.on('disconnect', function() {
    largeError("Disconnected");
});

socket.on('stop', function() {
    largeError("Paused");
});

$('#zoomin').click(function(e) {
    if (zoom > 0) {
        zoom--;
        draw(world);
    }
});

$('#zoomout').click(function(e) {
    if (zoom < zoom_factors.length - 1) {
        zoom++;
        draw(world);
    }
});
