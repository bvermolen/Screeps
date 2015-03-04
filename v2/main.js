/**
 * main
 */
console.log('Time: '+Game.time);

var _ = require('lodash');

var rooms = Game.rooms;

for(var i in rooms) {
    var room = rooms[i];

    if(!room.memory.initialised) {
        require('roomManager').initialise(room);
    }

    var spawn = require('control').getSpawn(room);

    if(spawn===null) {

        console.log('Waiting for spawn');
        continue;
    }

    require('control').action(spawn);
    require('creepFactory').action(spawn);
    require('creepManager').action(spawn);

}

