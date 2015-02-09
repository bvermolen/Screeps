/**
 * builder
 */
module.exports = {
	
	create: function(spawn) {
		var _ = require('lodash');
		
		var bodyParts = [Game.TOUGH, Game.WORK, Game.WORK, Game.MOVE, Game.CARRY];
		var role = 'builder';
		var numCreeps = require('creepManager').getRoleNumbers(role);
		var result = spawn.createCreep(bodyParts, role + '_' + numCreeps, {'role':role});
		
		if(_.isString(result)) {
			return true;
		}
		return false;
	},
	
	action: function (creep) {
		var spawn = Game.spawns.Spawn1;
	 
	 
		var targets = creep.room.find(Game.CONSTRUCTION_SITES);
		if(targets.length > 0) {
			var target = targets[0];
			if(creep.energy === 0) {
				creep.memory.action = 'On route to collect energy from ' + spawn.id;
				creep.moveTo(spawn);
				spawn.transferEnergy(creep);
			} else {
				creep.memory.action = 'Building ' + target.id;
				creep.moveTo(target);
				creep.build(target);
			}
		} else if (!creep.pos.inRangeTo(spawn, 10)) {
			creep.memory.action = 'Returning to ' + spawn.name;
			creep.moveTo(spawn);
		} else if (creep.pos.inRangeTo(spawn, 5)) {
			creep.memory.action = 'Create distance from spawn ' + spawn.name;
			creep.moveTo(25, 25);
		} else {
			creep.memory.action = 'Waiting for work';
		}
	}
}