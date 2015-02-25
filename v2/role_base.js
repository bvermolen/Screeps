/**
 * role_base
 */
var base = {
	
	say: function(creep, message) {
		creep.say(message);
		console.log(creep.name + ': ' + message);
	},
	
	idle: function(creep) {
		var spawn = require('control').getSpawn();
		
		if (!creep.pos.inRangeTo(spawn, 6)) {
			this.say(creep, 'Returning to ' + spawn.name);
			creep.moveTo(spawn);
		} else if (creep.pos.inRangeTo(spawn, 5)) {
			this.say(creep, 'Create distance from spawn ' + spawn.name);
			creep.moveTo(25, 25);
		} else {
			this.say(creep, 'Idleing');
		}
	},
	
	idleDefence: function(creep) {
		var spawn = require('control').getSpawn();
		
		if(creep.memory.squad) {
			
			var flagMemory = _.find(spawn.memory.flags, 'squad', creep.memory.squad);
			if(flagMemory) {
				creep.moveTo(flagMemory.posX, flagMemory.posY);
				this.say(creep, 'Moving to '+flagMemory.name);
			}
		}
		
	}
}

module.exports = base;