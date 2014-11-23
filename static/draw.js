
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

fof_style = {
    enemy: "red",
    friendly: "green",
    neutral: "cyan",
    unknown: "white"
}


function drawscope(ctx) {
        ctx.strokeStyle = "cyan";

        ctx.beginPath();
        ctx.arc(0,0,3,0,PI2, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-4,0);
        ctx.lineTo(-2,0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(4,0);
        ctx.lineTo(2,0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,-4);
        ctx.lineTo(0,-2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,4);
        ctx.lineTo(0,2);
        ctx.stroke();

}

function drawbeam(ctx, beam) {
    var rmin = beam.r_min;
    var rmax = beam.r_max;
    var f = beam.from;
    var t = beam.to;
    ctx.beginPath();
    ctx.moveTo(rmin * Math.sin(f), -rmin * Math.cos(f));
    ctx.lineTo(rmax * Math.sin(f), -rmax * Math.cos(f));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rmin * Math.sin(t), -rmin * Math.cos(t));
    ctx.lineTo(rmax * Math.sin(t), -rmax * Math.cos(t));
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,0,rmin,f - PIHalf,t - PIHalf,false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,0,rmax,f - PIHalf,t - PIHalf,false);
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

