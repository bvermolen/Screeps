/**
 * role_base
 */
var base = {
	idle: function(creep) {
		var spawn = Game.spawns.Spawn1;
		
		if (!creep.pos.inRangeTo(spawn, 6)) {
			creep.memory.action = 'Returning to ' + spawn.name;
			creep.moveTo(spawn);
		} else if (creep.pos.inRangeTo(spawn, 5)) {
			creep.memory.action = 'Create distance from spawn ' + spawn.name;
			creep.moveTo(25, 25);
		} else {
			creep.memory.action = 'Idleing';
		}
	}
}

module.exports = base;