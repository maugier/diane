var canvas = document.getElementById('radar');
var ctx = canvas.getContext('2d');

var zoom = 0;
var zoom_factors = [100,200,500,1000];

var rings = [50,100,250,500,750,1000];

function largeError(label) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText(label, 0, 0);
}

function draw(world) {

    var me = world.ships[shipname];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    var z = canvas.height / zoom_factors[zoom];
    ctx.scale(z,z);
    ctx.lineWidth = 1 / z;

    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    ctx.textBaseline = "top";
    for (var r = 0; r < rings.length; r++) {
        ring = rings[r];
        ctx.beginPath();
        ctx.arc(0,0,ring,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fillText(ring, 0, -ring);
    }

    ctx.translate(-me.x, -me.y);

    for (var sn in world.ships) {
        ship = world.ships[sn];
        drawship(ctx, ship);
    }

    ctx.restore();
}
    
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

setDraw(draw);
