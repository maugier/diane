
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

function drawbeam(ctx, beam) {
    r = beam.r;
    f = beam.from;
    t = beam.to;
    ctx.beginPath();
    ctx.moveTo(r * Math.sin(f), -r * Math.cos(f));
    ctx.lineTo(0,0);
    ctx.lineTo(r * Math.sin(t), -r * Math.cos(t));
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,0,r,f - PIHalf,t - PIHalf,false);
    ctx.stroke();
}

function drawship(ctx, ship) {
    ctx.strokeStyle = "red";
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.h);
    d2model[ship.model](ctx);

    ctx.strokeStyle = "green";
    beams = models[ship.model].beams;
    for (var b in beams) {
        drawbeam(ctx, beams[b]);
    }

    ctx.restore();
}

