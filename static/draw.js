
var d2model = {
    scout: function(ctx) {
        ctx.beginPath();
        ctx.moveTo(0,-2);
        ctx.lineTo(2,2);
        ctx.lineTo(0,1);
        ctx.lineTo(-2,2);
        ctx.closePath();
        ctx.stroke();
    }
}

function drawship(ctx, ship) {
    ctx.strokeStyle = "red";
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.h);
    d2model[ship.model](ctx);
    ctx.restore();
}

