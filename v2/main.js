/**
 * main
 */
console.log('main: Time: ' + Game.time);

var _ = require('lodash');

var rooms = Game.rooms;

for (var i in rooms) {
    var room = rooms[i];

    if (room.mode === Game.MODE_SURVIVAL || room.mode === Game.MODE_SIMULATION) {

        if (!require('survivalRoomManager').initialise(room)) {
            console.log('main: survivalRoom not initialised');
            return;
        }

        var spawn = require('survivalRoomManager').getSpawn(room);

        if (spawn !== null) {

            require('survivalControl').action(spawn);
            require('survivalCreepFactory').action(spawn);
            require('survivalCreepManager').action(spawn);

        } else {
            console.log('main: Waiting for spawn');
        }


    } else if (room.mode === Game.MODE_ARENA) {

        for (var creepKey in Game.creeps) {
            var creep = Game.creeps[creepKey];

            if (creep.my === true) {
                require('arenaControl').action(creep);
            }
        }

    } else {
        console.log('main: Unknown room mode ' + room.mode);

    }

}

