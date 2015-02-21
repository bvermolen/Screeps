/**
 * miner
 */
module.exports = {
	
	create: function(spawn) {
		var _ = require('lodash');
		
		var bodyParts = [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE, Game.MOVE];
		var role = 'miner';
		var numCreeps = require('creepManager').getRoleNumbers(role);
		var result = spawn.createCreep(bodyParts, role + '_' + numCreeps, {'role':role, 'source':null});
		
		if(_.isString(result)) {
			return true;
		}
		return result;
	},
	
	action: function (creep) {
		var spawn = require('control').getSpawn();

		var target = null;
		
		if(creep.memory.source===null) {
			creep.memory.source = creep.pos.findClosest(Game.SOURCES);
		}
		target = creep.memory.source;

		if(target!==null) {
			if(creep.energy < creep.energyCapacity) {
				creep.say('Mining ' + target.id);
				creep.moveTo(target);
				creep.harvest(target);
			} else {
				creep.say('Waiting for carrier');
			}
		}
	}
}