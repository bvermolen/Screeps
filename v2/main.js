/**
 * main
 */
console.log('Time: '+Game.time);

var _ = require('lodash');

var rooms = Game.rooms;

for(var i in rooms) {
    var room = rooms[i];

	if(room.mode===Game.MODE_SURVIVAL) {
		
		if(!room.memory.initialised) {
			require('survivalRoomManager').initialise(room);
		}

		var spawn = require('survivalControl').getSpawn(room);

		if(spawn===null) {

			console.log('Waiting for spawn');
			continue;
		}

		require('survivalControl').action(spawn);
		require('survivalCreepFactory').action(spawn);
		require('survivalCreepManager').action(spawn);
		
	} else if (room.mode===Game.MODE_ARENA) {

		for (var creepKey in Game.creeps) {
			var creep = Game.creeps[creepKey];
			
			if(creep.my===true) {
				require('arenaControl').action(creep);
			}
		}
		
	} else {
			console.log('Unknown room mode '+room.mode);
		
	}

}

