/* World simulation */

models = {
    scout: {
        size_x : 10,
        size_y : 10,
        max_speed: 10,
        turn_speed: 0.2
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

function angle(x) {
    return ((x + (Math.PI / 2)) % Math.PI) - (Math.PI / 2);
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

    o.vx = v * Math.sin(o.h);
    o.vy = -v * Math.cos(o.h); 

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
            Fucker: {
                name: 'Fucker',
                vx:0, vy: 1, v:1, h:0, th:0,
                x:30, y: 0, model: 'scout'
            }
        },
        size_x: 100,
        size_y: 100,
    }
}

exports.tick = tick;

