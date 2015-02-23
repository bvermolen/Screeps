/**
 * miner
 */
module.exports = {
	
	create: function(spawn) {
		var _ = require('lodash');
		
		var bodyParts = [Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE];
		var role = 'miner';
		var numCreeps = require('creepManager').getRoleNumbers(role);
		var result = spawn.createCreep(bodyParts, role + '_' + numCreeps, {'role':role, 'sourceID':null});
		
		if(_.isString(result)) {
			return true;
		}
		return result;
	},
	
	action: function (creep) {
		var spawn = require('control').getSpawn();

		var target = null;
		
		if(creep.memory.sourceID===null) {
			creep.memory.sourceID = creep.pos.findClosest(Game.SOURCES).id;
		}
		target = Game.getObjectById(creep.memory.sourceID);

		if(target!==null) {
			if(creep.energy < creep.energyCapacity) {
				creep.say('Mining ' + target.id);
				creep.moveTo(target);
				creep.harvest(target);
			} else {
				creep.say('Waiting for carrier');
			}
		} else {
			this.idle(creep);
		}
	}
}