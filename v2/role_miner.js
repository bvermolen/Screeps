/**
 * miner
 */
module.exports = {
	
	create: function(spawn, creepMemory) {
		var bodyParts = [Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE];
		creepMemory.role = 'miner';
		creepMemory.sourceID = null;
		var numCreeps = require('creepManager').getRoleNumbers(creepMemory.role);
		var result = spawn.createCreep(bodyParts, creepMemory.role + '_' + numCreeps, creepMemory);
		
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