
var d2model = {
    scout: function(ctx) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0,-10);
        ctx.lineTo(10,10);
        ctx.lineTo(0,5);
        ctx.lineTo(-10,10);
        ctx.closePath();
        ctx.stroke();
    }
}

function drawship(ctx, ship) {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(-ship.h);
    d2model[ship.model](ctx);
    ctx.restore();
}

