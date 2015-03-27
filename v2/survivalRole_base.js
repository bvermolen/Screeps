/**
 * survivalRole_base
 */
var survivalRole_base = {
	
	say: function(creep, message) {
		//creep.say(message);
		//console.log(creep.name + ': ' + message);
		creep.memory.message = message;
	},
	
	idle: function(creep) {
		var spawn = require('survivalControl').getSpawn();
		
		if (!creep.pos.inRangeTo(spawn, 6)) {
			this.say(creep, 'Returning to ' + spawn.name);
			creep.moveTo(spawn);
		} else if (creep.pos.inRangeTo(spawn, 5)) {
			this.say(creep, 'Create distance from spawn ' + spawn.name);
			creep.moveTo(25, 25);
		} else {
			this.say(creep, 'Idling');
		}
	},
	
	idleDefence: function(creep) {
		var spawn = require('survivalControl').getSpawn();
		
		if(creep.memory.squad) {
			
			var flagMemory = _.find(spawn.memory.flags, 'squad', creep.memory.squad);
			if(flagMemory) {
				creep.moveTo(flagMemory.posX, flagMemory.posY);
				this.say(creep, 'Moving to '+flagMemory.name);
			}
		}
		
	}
};

module.exports = survivalRole_base;