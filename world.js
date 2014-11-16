/* World simulation */


scout = {
    size_x : 10,
    size_y : 10,
    max_speed: 10
}

function tick() {
    this.time += 1;
    for (var name in this.ships) {
        ship = this.ships[name];
        ship.x += ship.vx;
        ship.y += ship.vy;
    }
}

exports.create = function() {
    return {
        time: 0,
        ships: {Artemis: {name: 'Artemis', vx: 0, vy: 0, x: 0, y: 0, model: scout}},
        size_x: 100,
        size_y: 100,
        tick: tick
    }
}

