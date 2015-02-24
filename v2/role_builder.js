/**
 * builder
 */
module.exports = {
	
	create: function(spawn, creepMemory) {
		var bodyParts = [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY];
		creepMemory.role = 'builder';
		var numCreeps = require('creepManager').getRoleNumbers(creepMemory.role);
		var result = spawn.createCreep(bodyParts, creepMemory.role + '_' + numCreeps, creepMemory);
		
		if(_.isString(result)) {
			return true;
		}
		return result;
	},
	
	action: function (creep) {
		var spawn = require('control').getSpawn();
	 
	 	var target = spawn.pos.findClosest(Game.CONSTRUCTION_SITES, {
			filter: function(object) {
				return object.my === true;
			}
		});
		
		if(target!==null) {
			if(creep.energy < creep.energyCapacity && creep.pos.inRangeTo(spawn, 1)) {
				spawn.transferEnergy(creep);
				creep.say('Collecting energy from ' + spawn.id);
				return;
			} else if(creep.energy === 0) {
				creep.moveTo(spawn);
				creep.say('On route to collect energy from ' + spawn.id);
				return;
			} else if (creep.energy > 0 && creep.pos.inRangeTo(target, 1)) {
				creep.build(target);
				creep.say('Building ' + target.id);
				return;
			} else if (creep.energy === creep.energyCapacity) {
				creep.moveTo(target);
				creep.say('Moving to ' + target.id);
				return;
			}
			
		}
		this.idle(creep);
	}
}