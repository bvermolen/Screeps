/**
 * carrier
 */
module.exports = {
	
	create: function(spawn) {
		var _ = require('lodash');
		
		var bodyParts = [Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE, Game.MOVE];
		var role = 'carrier';
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
				if(creep.energy > 0 && creep.pos.inRangeTo(spawn, 1)) {
					creep.transferEnergy(spawn);
					creep.say('Deliver Energy to' + spawn.name);
					return;
				} else if(creep.energy == creep.energyCapacity) {
					creep.moveTo(spawn);
					creep.say('On route to delivery energy to ' + spawn.name);
					return;
				} else if(creep.pos.inRangeTo(source, 2)) {
					
					var targets = _.sortBy(source.room.find(Game.MY_CREEPS, { 
						filter: function(object) { 
							return object.memory.role == 'miner' && object.memory.sourceID === creep.memory.sourceID;
						}
					}), 'energy');

					if(targets.length > 0) {
						var target = _.last(targets);
						creep.moveTo(target);
						target.transferEnergy(creep);
					} else {
						creep.say('Could not find miners');
					}
					return;
				} else {
					creep.moveTo(source);
					return;
				}
			}
		}
		this.idle(creep);
	}
}