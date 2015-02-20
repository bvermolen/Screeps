/**
 * harvester
 */
module.exports = {
	
	create: function(spawn) {
		var _ = require('lodash');
		
		var bodyParts = [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE, Game.MOVE];
		var role = 'harvester';
		var numCreeps = require('creepManager').getRoleNumbers(role);
		var result = spawn.createCreep(bodyParts, role + '_' + numCreeps, {'role':role});
		
		if(_.isString(result)) {
			return true;
		}
		return result;
	},
	
	action: function (creep) {
		var spawn = require('creepManager').getSpawn();

		var target = creep.pos.findClosest(Game.SOURCES, { 
			filter: function(object) { 
				return object.energy >= 10;
			}
		});

		if(target!==null) {
			if(creep.energy < creep.energyCapacity) {
				creep.say('Harvesting ' + target.id);
				creep.moveTo(target);
				creep.harvest(target);
			} else {
				creep.say('On route to delivery energy to ' + spawn.name);
				creep.moveTo(spawn);
				creep.transferEnergy(spawn);
			}
		} else if (!creep.pos.inRangeTo(spawn, 10)) {
			creep.say('Returning to ' + spawn.name);
			creep.moveTo(spawn);
		} else if (creep.pos.inRangeTo(spawn, 5)) {
			creep.say('Create distance from spawn ' + spawn.name);
			creep.moveTo(25, 25);
		} else {
			creep.say('Waiting for sources');
		}
	}
}