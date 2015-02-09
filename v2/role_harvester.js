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
		return false;
	},
	
	action: function (creep) {
		var spawn = Game.spawns.Spawn1;
		var targets = creep.room.find(Game.SOURCES, { 
			filter: function(object) { 
				return object.energy >= 10;
			}
		});

		if(targets.length > 0) {
			if(creep.energy < creep.energyCapacity) {
				creep.memory.action = 'Harvesting ' + targets[0].id;
				creep.moveTo(targets[0]);
				creep.harvest(targets[0]);
			} else {
				creep.memory.action = 'On route to delivery energy to ' + spawn.name;
				creep.moveTo(spawn);
				creep.transferEnergy(spawn);
			}
		} else if (!creep.pos.inRangeTo(spawn, 10)) {
			creep.memory.action = 'Returning to ' + spawn.name;
			creep.moveTo(spawn);
		} else if (creep.pos.inRangeTo(spawn, 5)) {
			creep.memory.action = 'Create distance from spawn ' + spawn.name;
			creep.moveTo(25, 25);
		} else {
			creep.memory.action = 'Waiting for sources';
		}
	}
}