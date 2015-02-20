/**
 * role_base
 */
var base = {
	idle: function(creep) {
		var spawn = require('control').getSpawn();
		
		if (!creep.pos.inRangeTo(spawn, 6)) {
			creep.say('Returning to ' + spawn.name);
			creep.moveTo(spawn);
		} else if (creep.pos.inRangeTo(spawn, 5)) {
			creep.say('Create distance from spawn ' + spawn.name);
			creep.moveTo(25, 25);
		} else {
			creep.say('Idleing');
		}
	}
}

module.exports = base;