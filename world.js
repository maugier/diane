/* World simulation */

models = {
    scout: {
        size_x : 10,
        size_y : 10,
        max_speed: 2.0,
        turn_speed: 0.01
    }
}

function tick(world) {
    world.time += 1;
    for (var name in world.ships) {
        ship = world.ships[name];
        turn(ship);
        move(ship);
    }
}

function execute(world, cmd) {

    var ship = world.ships[cmd.ship];
    var model = models[ship.model];

    var c = cmd.cmd;

    if (c.speed !== undefined) {
        ship.v = c.speed * model.max_speed / 10;
        speed(ship);
        console.log(cmd.ship + " speed set to " + ship.v);
    }

}


function angle(x) {
    return ((x + (Math.PI / 2)) % Math.PI) - (Math.PI / 2);
}

function speed(o) {
    o.vx = o.v * Math.sin(o.h);
    o.vy = -o.v * Math.cos(o.h); 
}

function turn(o) {
    if (o.th == o.h) 
        return;

    m = models[o.model];
    delta = angle(o.th - o.h);

    if (delta > m.turn_speed) {
        o.h += m.turn_speed 
    } else if (0 - delta > m.turn_speed) {
        o.h += m.turn_speed;
    } else {
        o.h = o.th;
    }

    speed(o);

}

function move(o) {
    o.x += o.vx;
    o.y += o.vy;
}

exports.create = function() {
    return {
        time: 0,
        ships: {
            Artemis: {
                name: 'Artemis', 
                vx: 0, vy: 0, v:0, h:0, th:0,
                x: 0, y: 0, model: 'scout'
            },
            Diane: {
                name: 'Diane',
                vx:0, vy: 0, v:1, h:0, th:1,
                x:30, y: 0, model: 'scout'
            }
        },
        size_x: 100,
        size_y: 100,
    }
}

exports.tick = tick;
exports.execute = execute;

