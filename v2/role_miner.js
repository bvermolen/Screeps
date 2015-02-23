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

		if(creep.memory.sourceID!==null) 
		{
			var source = Game.getObjectById(creep.memory.sourceID);

			if(source!==null) {
				if(creep.energy < creep.energyCapacity) {
					creep.say('Mining ' + source.id);
					creep.moveTo(source);
					creep.harvest(source);
				} else {
					creep.say('Waiting for carrier');
				}
				return;
			}
		}
		this.idle(creep);
	}
}