/**
 * carrier
 */
module.exports = {
	
	create: function(spawn) {
		var _ = require('lodash');
		
		var bodyParts = [Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE, Game.MOVE];
		var role = 'carrier';
		var numCreeps = require('creepManager').getRoleNumbers(role);
		var result = spawn.createCreep(bodyParts, role + '_' + numCreeps, {'role':role});
		
		if(_.isString(result)) {
			return true;
		}
		return result;
	},
	
	action: function (creep) {
		var spawn = require('control').getSpawn();

		var targets = _.sortBy(spawn.room.find(Game.MY_CREEPS, { 
			filter: function(object) { 
				return object.memory.role == 'miner' && object.energy >= 25;
			}
		}), 'energy');
		
		if(targets.length > 0)
		{
			var target = _.last(targets);

			if(creep.pos.inRangeTo(spawn, 1) && creep.energy > 0) {
				creep.transferEnergy(spawn);
				creep.say('Deliver Energy to' + spawn.name);
				return;
			} else if(creep.energy == creep.energyCapacity) {
				creep.moveTo(spawn);
				creep.say('On route to delivery energy to ' + spawn.name);
				return;
			} else if(target!==null) {
				creep.moveTo(target);
				target.transferEnergy(creep);
				return;
			}
		}
		this.idle(creep);
	}
}