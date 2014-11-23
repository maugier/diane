/* World simulation */

var PI2 = Math.PI * 2;
var PIHalf = Math.PI / 2;

models = {
    scout: {
        max_hp: 100,
        size : 5,
        max_speed: 2.0,
        turn_speed: 0.1,
        beams: {
            main: {r: 20, from: -0.6, to: 0.6, dmg: 1, reload: 70, duration: 30 }
        }
    },
    station: {
        size: 20,
        max_speed: 0,
        turn_speed: 0
    }
}




function tick(world) {
    world.time += 1;
    for (var name in world.ships) {
        ship = world.ships[name];
        turn(ship);
        move(ship);
        fire(ship);
    }
}

function rad2deg(t) {
    return Math.round(t * 180 / Math.PI);
}

function rel_bearing(ship, target) {
    return rangle(Math.atan2(target.x - ship.x, ship.y - target.y));
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

    if (c.angle !== undefined) {
        ship.th = angle(c.angle);
        console.log(cmd.ship + " heading set to " + ship.th * 360 / PI2);
    }

    if (c.target !== undefined) {
        ship.target = c.target;
        console.log(cmd.ship + " targetting " + c.target);
    }

}


// Working around broken modulo operator
function angle(x) {
    x = x % PI2;
    if (x < 0) {
        x += PI2;
    }
    return x;
}

function rangle(x) {
    x = x % PI2;
    if (x < Math.PI) {
        x += PI2;
    }
    if (x > Math.PI) {
        x -= PI2;
    }
    return x;
}

function speed(o) {
    o.vx = o.v * Math.sin(o.h);
    o.vy = -o.v * Math.cos(o.h); 
}

function turn(o) {
    if (o.th == o.h) 
        return;

    m = models[o.model];
    delta = rangle(o.th - o.h);

    if (delta > m.turn_speed) {
        o.h = angle(o.h + m.turn_speed);
    } else if (0 - delta > m.turn_speed) {
        o.h = angle(o.h - m.turn_speed);
    } else {
        o.h = o.th;
    }

    speed(o);

}

function move(o) {
    o.x += o.vx;
    o.y += o.vy;
}

function fire(o) {
    //TODO
}

function hostile(a, b) {
    return (a != b) && a != 'neutral' && b != 'neutral'; // All different factions are enemies
}

function locate(world, x, y) {
    var d = 1000000;
    var best = undefined;
    for (var on in world.ships) {
        o = world.ships[on];
        var dx = x - o.x;
        var dy = y - o.y;
        var d2 = dx*dx + dy*dy;

        var size = models[o.model].size;

        if (d2 < size*size && d2 < d) {
            d = d2;
            best = on;
        }
            
    }
    return best;
}

function Ship(name, faction, x, y, model) {
    this.name = name;
    this.faction = faction;
    this.model = model;

    this.hp = models[model].max_hp;

    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.th = 0;
    this.h = 0;
    this.scanned = {};
    this.beams = {};

    for (var b in models[model].beams) {
        this.beams[b] = {firing: false, time: 0}
    }

}

Ship.prototype.fof = function(tgt) {
    if (this.faction == 'neutral' || tgt.faction == 'neutral') {
        return 'neutral';
    }
    if (tgt.faction == this.faction) {
        return 'friendly';
    }
    if (this.scanned[tgt.name]) {
        return 'enemy';
    }
    return 'unknown';
    
}

function World() {
    this.time = 0;
    this.ships = {
        Artemis: new Ship('Artemis', 'alpha', 0, 0, 'scout'),
        Diane: new Ship('Diane', 'bravo', 30, 0, 'scout')
    }
    this.size_x = 1000;
    this.size_y = 1000;
}


exports.create = function() {
    return new World();
}

exports.tick = tick;
exports.execute = execute;
exports.locate = locate;

